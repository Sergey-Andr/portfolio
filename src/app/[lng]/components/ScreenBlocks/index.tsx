"use client";
import {useEffect, useRef} from "react";

const MIN_GAP = 128;

const toMargin = (distance: number) => Math.max(0, Math.ceil(distance) + 1);

const getBlocks = () =>
    Array.from(document.querySelectorAll<HTMLElement>("[data-screen-block]"));

const getHeaderHeight = () => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    return header && getComputedStyle(header).display !== "none" ? header.offsetHeight : 0;
};

const getTopInView = (block: HTMLElement, screen: number, header: number) =>
    header + Math.max(0, (screen - header - block.offsetHeight) / 2);

const findBlock = (hash: string) => {
    if (hash === "#") return getBlocks()[0];
    return document.getElementById(decodeURIComponent(hash.slice(1)))
        ?.closest<HTMLElement>("[data-screen-block]");
};

const scrollToBlock = (block: HTMLElement, behavior: ScrollBehavior) => {
    const top = block.getBoundingClientRect().top + window.scrollY
        - getTopInView(block, window.innerHeight, getHeaderHeight());
    window.scrollTo({top: Math.max(0, top), behavior});
};

const smoothOrInstant = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";

export default function ScreenBlocks() {
    const screenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const screenProbe = screenRef.current;
        if (!screenProbe) return;

        let pinned: { block: HTMLElement; behavior: ScrollBehavior } | null = null;

        const goTo = (block: HTMLElement, behavior: ScrollBehavior) => {
            pinned = {block, behavior};
            scrollToBlock(block, behavior);
        };

        const release = () => {
            pinned = null;
        };

        const layout = () => {
            const blocks = getBlocks();
            if (blocks.length === 0) return;
            const screen = Math.max(screenProbe.offsetHeight, window.innerHeight);
            const header = getHeaderHeight();
            const above = blocks.map((block) => getTopInView(block, screen, header));
            const below = blocks.map((block, i) =>
                Math.max(0, screen - above[i] - block.offsetHeight));

            const first = blocks[0];
            const naturalTop = first.getBoundingClientRect().top + window.scrollY
                - parseFloat(getComputedStyle(first).marginTop);
            first.style.marginTop = `${toMargin(above[0] - naturalTop)}px`;

            blocks.forEach((block, i) => {
                const gap = i === blocks.length - 1
                    ? below[i]
                    : Math.max(below[i], above[i + 1], MIN_GAP);
                block.style.marginBottom = `${toMargin(gap)}px`;
            });

            if (pinned) scrollToBlock(pinned.block, pinned.behavior);
        };

        const initialBlock = window.location.hash && findBlock(window.location.hash);
        if (initialBlock) pinned = {block: initialBlock, behavior: "instant"};
        layout();

        const userScrollEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
        userScrollEvents.forEach((type) =>
            window.addEventListener(type, release, {capture: true, passive: true}));

        const observer = new ResizeObserver(layout);
        observer.observe(screenProbe);
        getBlocks().forEach((block) => observer.observe(block));
        const header = document.querySelector<HTMLElement>("[data-site-header]");
        if (header) observer.observe(header);
        window.addEventListener("resize", layout);

        const onClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0
                || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const link = (event.target as Element).closest<HTMLAnchorElement>("a[href^='#']");
            if (!link) return;
            const hash = link.getAttribute("href")!;
            const block = findBlock(hash);
            if (!block) return;
            event.preventDefault();
            history.pushState(null, "", hash);
            goTo(block, smoothOrInstant());
        };
        document.addEventListener("click", onClick);

        const onHashChange = () => {
            const block = findBlock(window.location.hash || "#");
            if (block) goTo(block, smoothOrInstant());
        };
        window.addEventListener("hashchange", onHashChange);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", layout);
            document.removeEventListener("click", onClick);
            window.removeEventListener("hashchange", onHashChange);
            userScrollEvents.forEach((type) =>
                window.removeEventListener(type, release, {capture: true}));
        };
    }, []);

    return (
        <div
            ref={screenRef}
            aria-hidden
            className="pointer-events-none invisible fixed top-0 left-0 w-0"
            style={{height: "100vh"}}
        />
    );
}
