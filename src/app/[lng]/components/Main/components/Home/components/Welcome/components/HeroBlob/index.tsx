"use client";
import {ReactNode, useEffect, useRef} from "react";

type Shape = {top: number; bottom: number; left: number; right: number};

const MORPH_DURATION = 4000;
const MIN_SIDE_STEP = 13.25;
const MORPH_EASING = "cubic-bezier(.37,0,.63,1)";
const SPIN_MS_PER_DEG = 1700;
const FLOAT_MS_PER_PX = 7000 / 12;

const random = (min: number, max: number) => min + Math.random() * (max - min);

const nextSide = (value: number) => {
    const below = Math.max(0, value - MIN_SIDE_STEP - 36);
    const above = Math.max(0, 64 - value - MIN_SIDE_STEP);
    const offset = random(0, below + above);
    return offset < below ? 36 + offset : value + MIN_SIDE_STEP + (offset - below);
};

const nextShape = (shape: Shape): Shape => ({
    top: nextSide(shape.top),
    bottom: nextSide(shape.bottom),
    left: nextSide(shape.left),
    right: nextSide(shape.right),
});

const shapeFrame = (shape: Shape) => ({
    "--blob-top": `${shape.top}%`,
    "--blob-bottom": `${shape.bottom}%`,
    "--blob-left": `${shape.left}%`,
    "--blob-right": `${shape.right}%`,
});

const opposite = (value: number, min: number, max: number) => (value > 0 ? -1 : 1) * random(min, max);

const HeroBlob = ({children}: { children: ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let stopped = false;
        const running = new Set<Animation>();

        const chain = async <T, >(
            first: T,
            next: (value: T) => T,
            frame: (value: T) => Keyframe,
            duration: (from: T, to: T) => number,
            easing: string,
        ) => {
            let current = first;
            while (!stopped) {
                const target = next(current);
                const animation = element.animate([frame(current), frame(target)], {
                    duration: duration(current, target),
                    easing,
                    fill: "forwards",
                });
                running.add(animation);
                try {
                    await animation.finished;
                } catch {
                    return;
                }
                running.delete(animation);
                current = target;
            }
        };

        chain<Shape>({top: 64, bottom: 42, left: 55, right: 62}, nextShape, shapeFrame, () => MORPH_DURATION, MORPH_EASING);
        chain<number>(
            0,
            (value) => opposite(value, 3, 5),
            (value) => ({"--blob-spin": `${value}deg`}),
            (from, to) => Math.abs(to - from) * SPIN_MS_PER_DEG,
            "ease-in-out",
        );
        chain<number>(
            0,
            (value) => opposite(value, 4, 6),
            (value) => ({"--blob-float": `${value}px`}),
            (from, to) => Math.abs(to - from) * FLOAT_MS_PER_PX,
            "ease-in-out",
        );

        return () => {
            stopped = true;
            running.forEach((animation) => animation.cancel());
        };
    }, []);

    return (
        <div ref={ref} className="hero-blob overflow-hidden border-2 border-black">
            {children}
        </div>
    );
};

export default HeroBlob;
