"use client"
import React, {useEffect, useRef, useState} from 'react';
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {useScrollAreaState} from "@/app/[lng]/components/Main/components/Articles/hooks/useScrollAreaState";
import {TFunction, useTranslation} from "@/app/i18n";
import {usePathname} from "next/navigation";
import {Trans} from "react-i18next";

const articles = [
    {id: 1, article: "codeQuality"},
    {id: 2, article: "businessMindset"},
    {id: 3, article: "restParadox"},
    {id: 4, article: "readingDocumentation"},
    {id: 5, article: "AIStandard"},
]

const Articles = () => {
    const [chosenArticleId, setChosenArticleId] = useState<number>(1);
    const [translation, setTranslation] = useState<TFunction | null>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const [scrollAreaRef, scrollState] = useScrollAreaState();
    const pathname = usePathname().split("/")[1];
    const {isScrollable, isScrolledStart, isScrolledEnd} = scrollState ?? {};

    useEffect(() => {
        (async () => {
            const {t} = await useTranslation(pathname)
            console.log(123, t)
            setTranslation(() => t)
        })()
    }, [])

    const scrollToLeft = (direction: 'left' | 'right') => {
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
    const handleTabClick = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
        setChosenArticleId(id);

        if (!viewportRef.current) return;

        viewportRef.current.scrollTo({
            left: event.currentTarget.offsetLeft - (viewportRef.current.clientWidth / 2) + (event.currentTarget.offsetWidth / 2),
            behavior: "smooth"
        });
    };

    return (
        <section id="articles" className="mb-96 max-lg:mb-72 max-sm:mb-32 flex flex-col scroll-m-16">
            <div className="mb-4">
                <h2
                    id="about"
                    className="text-2xl quad:text-4xl max-lg:text-lg uppercase text-sky-400 font-medium quad:mb-2 scroll-m-16"
                >
                    {translation && translation("articles.title")}
                </h2>
                <h3 className="text-2xl quad:text-4xl max-lg:text-lg font-bold max-sm:mb-4 mb-2">
                    {translation && translation("articles.subTitle")}
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
                        {translation &&
                            (<>
                                <button onClick={(e) => handleTabClick(1, e)}
                                        className={`px-2 rounded-lg duration-100 ${chosenArticleId === 1 ? "bg-black/80 text-white" : "bg-black/20"}`}>
                                    {translation("articles.articles.codeQuality.title")}
                                </button>
                                <button onClick={(e) => handleTabClick(2, e)}
                                        className={`px-2 rounded-lg duration-100 ${chosenArticleId === 2 ? "bg-black/80 text-white" : "bg-black/20"}`}>
                                    {translation("articles.articles.businessMindset.title")}
                                </button>
                                <button onClick={(e) => handleTabClick(3, e)}
                                        className={`px-2 rounded-lg duration-100 ${chosenArticleId === 3 ? "bg-black/80 text-white" : "bg-black/20"}`}>
                                    {translation("articles.articles.restParadox.title")}
                                </button>
                                <button onClick={(e) => handleTabClick(4, e)}
                                        className={`px-2 rounded-lg duration-100 ${chosenArticleId === 4 ? "bg-black/80 text-white" : "bg-black/20"}`}>
                                    {translation("articles.articles.readingDocumentation.title")}
                                </button>
                                <button onClick={(e) => handleTabClick(5, e)}
                                        className={`px-2 rounded-lg duration-100 ${chosenArticleId === 5 ? "bg-black/80 text-white" : "bg-black/20"}`}>
                                    {translation("articles.articles.AIStandard.title")}
                                </button>
                            </>)}
                    </div>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
                {isScrollable && (
                    <>
                        {!isScrolledStart && (
                            <span
                                onClick={() => scrollToLeft("left")}
                                className="w-2.5 h-2.5 p-4 block absolute left-0 top-1/2 -translate-y-1/3 cursor-pointer group fade-left before:absolute before:z-10 before:w-3 before:h-0.5 before:-rotate-45 before:bg-black before:top-1/3 before:left-0 after:absolute after:w-3 after:h-0.5 after:rotate-45 after:bg-black after:bottom-1/3 after:left-0">
                                <span
                                    className="absolute w-8 h-8 scale-0 bg-black/10 top-1/2 left-1/2 -translate-x-[75%] -translate-y-1/2 rounded-full -z-5 group-hover:scale-100 duration-100"/>
                            </span>
                        )}
                        {!isScrolledEnd && (
                            <span
                                onClick={() => scrollToLeft("right")}
                                className="w-0 h-2.5 p-4 block  absolute -right-8 top-1/2 -translate-y-[40%] cursor-pointer group fade-right before:absolute before:z-10 before:w-3 before:h-0.5 before:rotate-45 before:bg-black before:top-1/3 before:left-0 after:absolute after:w-3 after:h-0.5 after:-rotate-45 after:bg-black after:bottom-1/3 after:left-0">
                                <span
                                    className="absolute w-8 h-8 scale-0 bg-black/10 top-1/2 left-1/2 -translate-x-[80%] -translate-y-1/2 rounded-full -z-5 group-hover:scale-100 duration-100"/>
                            </span>
                        )}
                    </>
                )}
            </div>
            <article key={chosenArticleId}
                     className="text-black/60 quad:text-xl quad:tracking-wide max-lg:text-sm whitespace-pre-line animate-fade-in [&_ul]:list-disc [&_ul]:ml-8 [&_ul]:my-4 [&_strong]:mb-2 [&_code]:bg-black/20 [&_code]:rounded-sm [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm">
                {translation ? <Trans i18nKey={`articles.articles.${articles[chosenArticleId - 1].article}.text`}
                                      components={{
                                          strong: <strong/>,
                                          ul: <ul/>,
                                          li: <li/>,
                                          code: <code/>
                                      }}/> : "Loader"}
            </article>
        </section>
    );
};

export default Articles;
