import type {Metadata} from "next";
import {dir} from "i18next";
import "./globals.css";
import {languages, languageToLocale} from "@/app/i18n/settings";
import {useTranslation} from "@/app/i18n";
import {ReactNode} from "react";

export async function generateMetadata({params: {lng}}: { params: { lng: string } }): Promise<Metadata> {
    const {t} = await useTranslation(lng);
    const title = t("meta.title");
    const description = t("meta.description");
    return {
        metadataBase: new URL("https://serhii-dev.vercel.app"),
        title,
        description,
        icons: {icon: {url: "/logo.webp", type: "image/webp"}},
        openGraph: {title, description, images: ["/logo.webp"], locale: languageToLocale(lng)},
    };
}

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
        <html lang={languageToLocale(lng)} dir={dir(lng)} className="scroll-smooth overflow-x-hidden">
        <body className="min-h-dvh h-full bg-white font-sans">
        <div className="w-4/5 max-sm:w-11/12 m-auto min-h-dvh h-full">
            {children}
        </div>
        </body>
        </html>
    );
}
