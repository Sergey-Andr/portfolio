"use client"

import * as React from "react"
import {ScrollArea as ScrollAreaPrimitive} from "radix-ui"

import {cn} from "@/lib/utils"

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
    viewportRef?: React.RefObject<HTMLDivElement>;
}

const ScrollArea = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.Root>,
    ScrollAreaProps
>(({className, children, viewportRef, ...props}, ref) => (
    <ScrollAreaPrimitive.Root
        data-slot="scroll-area"
        className={cn("relative", className)}
        {...props}
        ref={ref}
    >
        <ScrollAreaPrimitive.Viewport
            ref={viewportRef}
            data-slot="scroll-area-viewport"
            className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
        >
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar/>
        <ScrollAreaPrimitive.Corner/>
    </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({className, orientation = "vertical", ...props}, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        data-slot="scroll-area-scrollbar"
        data-orientation={orientation}
        orientation={orientation}
        className={cn(
            "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
            className
        )}
        ref={ref}
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb
            data-slot="scroll-area-thumb"
            className="relative flex-1 rounded-full bg-border"
        />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export {ScrollArea, ScrollBar}
