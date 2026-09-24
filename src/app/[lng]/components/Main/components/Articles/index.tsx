"use client"
import React, {useRef, useState} from 'react';
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {useScrollAreaState} from "@/app/[lng]/components/Main/components/Articles/hooks/useScrollAreaState";

export interface ArticleItem {
    key: string;
    title: string;
    text: string;
}

interface ArticlesProps {
    title: string;
    subTitle: string;
    scrollLeft: string;
    scrollRight: string;
    items: ArticleItem[];
}

const Articles = ({title, subTitle, scrollLeft, scrollRight, items}: ArticlesProps) => {
    const [chosenIndex, setChosenIndex] = useState(0);
    const viewportRef = useRef<HTMLDivElement>(null);
    const [scrollAreaRef, scrollState] = useScrollAreaState();
    const {isScrollable, isScrolledStart, isScrolledEnd} = scrollState ?? {};

    const scrollTabs = (direction: 'left' | 'right') => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const container = viewport.querySelector('.flex');
        if (!container) return;

        const children = Array.from(container.children) as HTMLElement[];
        if (children.length === 0) return;

        const totalContentWidth = container.scrollWidth;
        const averageStep = totalContentWidth / children.length;

        const visibleWidth = viewport.clientWidth;

        const scrollAmount = visibleWidth > averageStep * 2
            ? averageStep * Math.floor(visibleWidth / averageStep)
            : averageStep;

        viewport.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        });
    };

    const handleTabClick = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
        setChosenIndex(index);

        if (!viewportRef.current) return;

        viewportRef.current.scrollTo({
            left: event.currentTarget.offsetLeft - (viewportRef.current.clientWidth / 2) + (event.currentTarget.offsetWidth / 2),
            behavior: "smooth"
        });
    };

    return (
        <section id="articles" data-screen-block className="mb-96 max-lg:mb-72 max-sm:mb-32 flex flex-col scroll-m-16">
            <div className="mb-4">
                <h2 className="text-2xl quad:text-4xl max-lg:text-lg uppercase text-sky-400 font-medium quad:mb-2 scroll-m-16">
                    {title}
                </h2>
                <h3 className="text-2xl quad:text-4xl max-lg:text-lg font-bold max-sm:mb-4 mb-2">
                    {subTitle}
                </h3>
            </div>
            <div className="relative w-full mb-4">
                <ScrollArea ref={scrollAreaRef}
                            viewportRef={viewportRef}
                            className={`w-full  
                            ${!isScrolledStart && !isScrolledEnd ? "fadeBothEdges" : ""}
                            ${!isScrolledStart && isScrolledEnd ? "fadeToLeft" : ""}
                            ${isScrolledStart && !isScrolledEnd ? "fadeToRight" : ""}`}
                >
                    <div className="flex gap-2 w-max text-lg font-semibold">
                        {items.map((item, index) => (
                            <button key={item.key}
                                    type="button"
                                    onClick={(e) => handleTabClick(index, e)}
                                    className={`px-2 rounded-lg duration-100 ${chosenIndex === index ? "bg-black/80 text-white" : "bg-black/20"}`}>
                                {item.title}
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
                {isScrollable && (
                    <>
                        {!isScrolledStart && (
                            <button
                                type="button"
                                aria-label={scrollLeft}
                                onClick={() => scrollTabs("left")}
                                className="w-2.5 h-2.5 p-4 block absolute left-0 top-1/2 -translate-y-1/3 cursor-pointer group fade-left before:absolute before:z-10 before:w-3 before:h-0.5 before:-rotate-45 before:bg-black before:top-1/3 before:left-0 after:absolute after:w-3 after:h-0.5 after:rotate-45 after:bg-black after:bottom-1/3 after:left-0">
                                <span
                                    className="absolute w-8 h-8 scale-0 bg-black/10 top-1/2 left-1/2 -translate-x-[75%] -translate-y-1/2 rounded-full -z-5 group-hover:scale-100 duration-100"/>
                            </button>
                        )}
                        {!isScrolledEnd && (
                            <button
                                type="button"
                                aria-label={scrollRight}
                                onClick={() => scrollTabs("right")}
                                className="w-0 h-2.5 p-4 block absolute right-0 top-1/2 -translate-y-[40%] cursor-pointer group fade-right before:absolute before:z-10 before:w-3 before:h-0.5 before:rotate-45 before:bg-black before:top-1/3 before:left-0 after:absolute after:w-3 after:h-0.5 after:-rotate-45 after:bg-black after:bottom-1/3 after:left-0">
                                <span
                                    className="absolute w-8 h-8 scale-0 bg-black/10 top-1/2 left-1/2 -translate-x-[80%] -translate-y-1/2 rounded-full -z-5 group-hover:scale-100 duration-100"/>
                            </button>
                        )}
                    </>
                )}
            </div>
            <article key={chosenIndex}
                     dangerouslySetInnerHTML={{__html: items[chosenIndex].text}}
                     className="text-black/60 quad:text-xl quad:tracking-wide max-lg:text-sm whitespace-pre-line animate-fade-in [&_ul]:list-disc [&_ul]:ml-8 [&_ul]:my-4 [&_strong]:mb-2 [&_code]:bg-black/20 [&_code]:rounded-sm [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm"/>
        </section>
    );
};

export default Articles;
