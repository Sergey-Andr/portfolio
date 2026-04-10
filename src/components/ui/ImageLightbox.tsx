"use client";

import * as React from "react";
import {useEffect, useState} from "react";
import Image from "next/image";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {StaticImageData} from "next/dist/shared/lib/get-img-props";

interface ImageLightboxProps {
    src: StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
}

export function ImageLightbox({
                                  src,
                                  alt,
                                  width = 800,
                                  height = 600,
                                  className,
                              }: ImageLightboxProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) document.documentElement.style.overflow = "hidden";
        else document.documentElement.style.overflow = "";

        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={cn(
                        "cursor-pointer transition-opacity hover:opacity-90",
                        className
                    )}
                />
            </DialogTrigger>
            <DialogContent className="w-fit h-fit p-0 flex items-center">
                <div className="relative w-[80vw] h-[90vh]">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain"
                        sizes="100vw"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}