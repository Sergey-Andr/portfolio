"use client";

import * as React from "react";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {StaticImageData} from "next/dist/shared/lib/get-img-props";
import {ChevronLeft, ChevronRight, Maximize2} from "lucide-react";

const SWIPE_THRESHOLD = 50;

interface ImageLightboxProps {
    images: StaticImageData[];
    alt: string;
    labels: { open: string; prev: string; next: string };
    width?: number;
    height?: number;
    className?: string;
}

export function ImageLightbox({
                                  images,
                                  alt,
                                  labels,
                                  width = 800,
                                  height = 600,
                                  className,
                              }: ImageLightboxProps) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const hasMany = images.length > 1;

    useEffect(() => {
        if (open) document.documentElement.style.overflow = "hidden";
        else document.documentElement.style.overflow = "";

        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [open]);

    const show = (next: number) =>
        setIndex((next + images.length) % images.length);

    const onOpenChange = (value: boolean) => {
        if (value) setIndex(0);
        setOpen(value);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
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
        show(delta < 0 ? index + 1 : index - 1);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    aria-label={`${labels.open}: ${alt}`}
                    className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-black/[0.03] transition duration-200 ease-in-out hover:-translate-y-0.5 hover:border-sky-400/60 hover:shadow-[0_8px_24px_-8px_rgba(56,189,248,0.45)] focus-visible:-translate-y-0.5 focus-visible:border-sky-400 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                    <Image
                        src={images[0]}
                        alt={alt}
                        width={width}
                        height={height}
                        className={cn("block", className)}
                    />
                    <span
                        aria-hidden
                        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-2.5 py-1 text-xs font-medium text-black/70 opacity-0 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
                    >
                        <Maximize2 className="h-3.5 w-3.5"/>
                        {hasMany ? images.length : null}
                    </span>
                </button>
            </DialogTrigger>
            <DialogContent
                className="w-fit h-fit p-0 flex items-center"
                onKeyDown={onKeyDown}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <DialogTitle className="sr-only">{alt}</DialogTitle>
                <div className="relative w-[80vw] h-[90vh] max-sm:w-[94vw] max-sm:h-[70vh]">
                    {images.map((image, i) => (
                        <Image
                            key={image.src}
                            src={image}
                            alt={hasMany ? `${alt} ${i + 1}/${images.length}` : alt}
                            fill
                            aria-hidden={i !== index}
                            className={cn(
                                "object-contain transition-opacity duration-300",
                                i === index ? "opacity-100" : "opacity-0 pointer-events-none",
                            )}
                            sizes="100vw"
                        />
                    ))}
                    {hasMany && (
                        <>
                            <button
                                type="button"
                                aria-label={labels.prev}
                                onClick={() => show(index - 1)}
                                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition duration-200 hover:border-sky-400 hover:bg-black/60 focus-visible:border-sky-400 focus-visible:outline-none"
                            >
                                <ChevronLeft className="h-6 w-6"/>
                            </button>
                            <button
                                type="button"
                                aria-label={labels.next}
                                onClick={() => show(index + 1)}
                                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition duration-200 hover:border-sky-400 hover:bg-black/60 focus-visible:border-sky-400 focus-visible:outline-none"
                            >
                                <ChevronRight className="h-6 w-6"/>
                            </button>
                            <div
                                aria-live="polite"
                                className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-1.5"
                            >
                                {images.map((image, i) => (
                                    <button
                                        key={image.src}
                                        type="button"
                                        aria-label={`${i + 1}/${images.length}`}
                                        aria-current={i === index}
                                        onClick={() => show(i)}
                                        className={cn(
                                            "h-2 rounded-full transition-all duration-200",
                                            i === index ? "w-5 bg-sky-400" : "w-2 bg-white/50 hover:bg-white/80",
                                        )}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
