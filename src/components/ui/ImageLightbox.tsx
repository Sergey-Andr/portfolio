"use client";

import * as React from "react";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {Dialog as DialogPrimitive} from "radix-ui";
import {cn} from "@/lib/utils";
import {StaticImageData} from "next/dist/shared/lib/get-img-props";
import {ChevronLeft, ChevronRight, Maximize2, Pause, Play, XIcon} from "lucide-react";

const SWIPE_THRESHOLD = 50;

const arrowClassName =
    "absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition duration-200 hover:border-sky-400 hover:bg-black/60 focus-visible:border-sky-400 focus-visible:outline-none";

export type ProjectMedia =
    | { type: "image"; src: StaticImageData }
    | { type: "video"; src: string; poster: string };

interface ImageLightboxProps {
    cover: StaticImageData;
    media?: ProjectMedia[];
    alt: string;
    labels: { open: string; prev: string; next: string; play: string; pause: string; seek: string };
    width?: number;
    height?: number;
    className?: string;
}

const formatTime = (seconds: number) => {
    const total = Math.floor(Number.isFinite(seconds) ? seconds : 0);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

function VideoControls({video, labels}: { video: HTMLVideoElement; labels: ImageLightboxProps["labels"] }) {
    const [playing, setPlaying] = useState(!video.paused);
    const [time, setTime] = useState(video.currentTime);
    const [duration, setDuration] = useState(video.duration);

    useEffect(() => {
        const sync = () => {
            setPlaying(!video.paused);
            setTime(video.currentTime);
            setDuration(video.duration);
        };
        const events = ["play", "pause", "timeupdate", "loadedmetadata", "durationchange", "seeked"];
        events.forEach((name) => video.addEventListener(name, sync));
        sync();
        return () => events.forEach((name) => video.removeEventListener(name, sync));
    }, [video]);

    const stop = (e: React.SyntheticEvent) => e.stopPropagation();

    return (
        <div
            onClick={stop}
            onTouchStart={stop}
            onTouchEnd={stop}
            className="absolute bottom-16 left-1/2 flex w-[min(640px,86vw)] -translate-x-1/2 cursor-default items-center gap-3 rounded-full bg-black/50 px-3 py-2 text-xs tabular-nums text-white"
        >
            <button
                type="button"
                aria-label={playing ? labels.pause : labels.play}
                onClick={() => (video.paused ? video.play().catch(() => undefined) : video.pause())}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
                {playing ? <Pause className="h-4 w-4 fill-current"/> : <Play className="h-4 w-4 fill-current"/>}
            </button>
            <span>{formatTime(time)}</span>
            <input
                type="range"
                aria-label={labels.seek}
                min={0}
                max={Number.isFinite(duration) ? duration : 0}
                step={0.1}
                value={time}
                onChange={(e) => {
                    video.currentTime = Number(e.target.value);
                    setTime(video.currentTime);
                }}
                className="h-1 flex-1 cursor-pointer rounded-full accent-sky-400 outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            />
            <span>{formatTime(duration)}</span>
        </div>
    );
}

function Slide({item, alt, active, onActive}: {
    item: ProjectMedia;
    alt: string;
    active: boolean;
    onActive: (video: HTMLVideoElement | null) => void;
}) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (active) onActive(video);
        if (!video) return;
        if (!active) {
            video.pause();
            return;
        }
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        video.currentTime = 0;
        video.play().catch(() => undefined);
    }, [active, onActive]);

    const className = cn(
        "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
        active ? "opacity-100" : "opacity-0",
    );

    if (item.type === "video") {
        return (
            <video
                ref={videoRef}
                src={item.src}
                poster={item.poster}
                aria-label={alt}
                aria-hidden={!active}
                muted
                loop
                playsInline
                preload="metadata"
                className={className}
            />
        );
    }

    return (
        <Image
            src={item.src}
            alt={alt}
            fill
            aria-hidden={!active}
            className={className}
            sizes="100vw"
        />
    );
}

export function ImageLightbox({
                                  cover,
                                  media,
                                  alt,
                                  labels,
                                  width = 800,
                                  height = 600,
                                  className,
                              }: ImageLightboxProps) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const [activeVideo, setActiveVideo] = useState<HTMLVideoElement | null>(null);
    const slides: ProjectMedia[] = media ?? [{type: "image", src: cover}];
    const hasMany = slides.length > 1;
    const hasVideo = slides.some((item) => item.type === "video");

    useEffect(() => {
        if (!open) setActiveVideo(null);
    }, [open]);

    const show = (next: number) =>
        setIndex((next + slides.length) % slides.length);

    const onOpenChange = (value: boolean) => {
        if (value) setIndex(0);
        setOpen(value);
    };

    const slide = (e: React.MouseEvent, next: number) => {
        e.stopPropagation();
        show(next);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT") return;
        if (e.key === " " && activeVideo && target.tagName !== "BUTTON") {
            e.preventDefault();
            if (activeVideo.paused) activeVideo.play().catch(() => undefined);
            else activeVideo.pause();
            return;
        }
        if (!hasMany) return;
        if (e.key === "ArrowLeft") show(index - 1);
        if (e.key === "ArrowRight") show(index + 1);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || !hasMany) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) < SWIPE_THRESHOLD) return;
        e.preventDefault();
        show(delta < 0 ? index + 1 : index - 1);
    };

    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Trigger asChild>
                <button
                    type="button"
                    aria-label={`${labels.open}: ${alt}`}
                    className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-black/[0.03] transition duration-200 ease-in-out hover:-translate-y-0.5 hover:border-sky-400/60 hover:shadow-[0_8px_24px_-8px_rgba(56,189,248,0.45)] focus-visible:-translate-y-0.5 focus-visible:border-sky-400 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                    <Image
                        src={cover}
                        alt={alt}
                        width={width}
                        height={height}
                        className={cn("block", className)}
                    />
                    <span
                        aria-hidden
                        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-2.5 py-1 text-xs font-medium text-black/70 opacity-0 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
                    >
                        {hasVideo ? <Play className="h-3.5 w-3.5 fill-current"/> : null}
                        <Maximize2 className="h-3.5 w-3.5"/>
                        {hasMany ? slides.length : null}
                    </span>
                </button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out motion-reduce:animate-none"
                />
                <DialogPrimitive.Content
                    aria-describedby={undefined}
                    onClick={() => setOpen(false)}
                    onKeyDown={onKeyDown}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center outline-none data-[state=open]:animate-lightbox-in data-[state=closed]:animate-lightbox-out motion-reduce:animate-none"
                >
                    <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>
                    <div className="relative w-[80vw] h-[82vh] max-sm:w-[94vw] max-sm:h-[70vh]">
                        {slides.map((item, i) => (
                            <Slide
                                key={i}
                                item={item}
                                alt={hasMany ? `${alt} ${i + 1}/${slides.length}` : alt}
                                active={i === index}
                                onActive={setActiveVideo}
                            />
                        ))}
                    </div>
                    {activeVideo && <VideoControls video={activeVideo} labels={labels}/>}
                    {hasMany && (
                        <>
                            <button
                                type="button"
                                aria-label={labels.prev}
                                onClick={(e) => slide(e, index - 1)}
                                className={cn(arrowClassName, "left-4 cursor-pointer max-sm:left-2")}
                            >
                                <ChevronLeft className="h-6 w-6"/>
                            </button>
                            <button
                                type="button"
                                aria-label={labels.next}
                                onClick={(e) => slide(e, index + 1)}
                                className={cn(arrowClassName, "right-4 cursor-pointer max-sm:right-2")}
                            >
                                <ChevronRight className="h-6 w-6"/>
                            </button>
                            <div
                                aria-live="polite"
                                onClick={(e) => e.stopPropagation()}
                                className="absolute bottom-6 left-1/2 flex -translate-x-1/2 cursor-default items-center gap-2 rounded-full bg-black/40 px-3 py-1.5"
                            >
                                {slides.map((item, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        aria-label={`${i + 1}/${slides.length}`}
                                        aria-current={i === index}
                                        onClick={(e) => slide(e, i)}
                                        className={cn(
                                            "h-2 cursor-pointer rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                                            i === index ? "w-5 bg-sky-400" : "w-2 bg-white/50 hover:bg-white/80",
                                        )}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    <DialogPrimitive.Close
                        className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white/80 transition duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                        <XIcon className="h-6 w-6"/>
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
