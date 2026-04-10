import type {Metadata} from "next";
import {dir} from "i18next";
import "./globals.css";
import {languages} from "@/app/i18n/settings";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: "Portfolio",
};

export async function generateStaticParams() {
    return languages.map((lng) => ({lng}));
}

export default function RootLayout({
                                       children,
                                       params: {lng},
                                   }: Readonly<{
    children: ReactNode;
    params: { lng: string };
}>) {
    return (
        <html lang={lng} dir={dir(lng)} className="scroll-smooth overflow-x-hidden">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta
                property="og:image"
                content="https://i.postimg.cc/1t87yGGK/logo.webp"
            />
            <link href={`/logo.webp`} rel="icon" type="image/svg+xml"/>
            <title>Portfolio</title>
        </head>
        <body className="w-4/5 max-sm:w-11/12 m-auto min-h-dvh h-full bg-white font-sans">
        {children}
        </body>
        </html>
    );
}
