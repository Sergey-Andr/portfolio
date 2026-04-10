import {RefCallback, useCallback, useState} from "react";

interface ScrollState {
    isScrollable: boolean;
    isScrolledStart: boolean;
    isScrolledEnd: boolean;
}

export function useScrollAreaState(): [RefCallback<HTMLElement>, ScrollState] {
    const [state, setState] = useState<ScrollState | null>(null);

    const refCallback = useCallback((node: HTMLElement | null) => {
        if (!node) return;
        const viewport = node.querySelector(
            "[data-radix-scroll-area-viewport]"
        ) as HTMLElement | null;

        if (!viewport) return;

        const checkScroll = () => {
            const {scrollLeft, scrollWidth, clientWidth} = viewport;
            const isScrollable = scrollWidth > clientWidth + 1;
            const isScrolledStart = scrollLeft <= 0;
            const isScrolledEnd = scrollLeft + clientWidth >= scrollWidth - 1;

            setState((prev) => {
                if (!prev) {
                    return {isScrollable, isScrolledStart, isScrolledEnd};
                }

                if (
                    prev.isScrollable === isScrollable &&
                    prev.isScrolledStart === isScrolledStart &&
                    prev.isScrolledEnd === isScrolledEnd
                ) {
                    return prev;
                }

                return {isScrollable, isScrolledStart, isScrolledEnd};
            });


        };

        const resizeObserver = new ResizeObserver(checkScroll);
        const mutationObserver = new MutationObserver(checkScroll);

        viewport.addEventListener("scroll", checkScroll);
        resizeObserver.observe(viewport);
        mutationObserver.observe(viewport, {childList: true, subtree: true});

        checkScroll();

    }, []);

    return [refCallback, state];
}