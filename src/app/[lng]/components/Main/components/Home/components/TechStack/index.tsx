import Image from "next/image";
import {TFunction} from "@/app/i18n";
import html from "../../../../../../../../../public/html.webp";
import css from "../../../../../../../../../public/css.webp";
import js from "../../../../../../../../../public/js.webp";
import ts from "../../../../../../../../../public/ts.webp";
import react from "../../../../../../../../../public/react.webp";
import next from "../../../../../../../../../public/next.webp";
import tailwind from "../../../../../../../../../public/tailwind.webp";
import mui from "../../../../../../../../../public/mui.webp";
import {StaticImageData} from "next/dist/shared/lib/get-img-props";

export default async function TechStack({language}: { language: TFunction }) {
    return (
        <div className="flex items-center">
            <h3 className="text-xl quad:text-2xl max-lg:text-lg max-sm:text-sm font-bold mr-8 max-sm:mr-2 text-nowrap">
                {language("main.home.stack")}&nbsp;&nbsp;
                <span className="relative -top-0.5">|</span>
            </h3>
            <div className="flex grid-rows-1 gap-8 quad:gap-12 max-lg:gap-6 max-sm:gap-4 w-full">
                <Image
                    src={html as StaticImageData}
                    alt="html"
                    className="w-9 quad:w-12 max-lg:w-7 max-sm:w-5"
                />
                <Image
                    width="28"
                    height="26"
                    src={css as StaticImageData}
                    alt="css"
                    className="w-7 quad:w-9 max-lg:w-5 max-sm:w-4"
                />
                <Image
                    src={js as StaticImageData}
                    alt="js"
                    className="w-8 quad:w-9 max-lg:w-6 max-sm:w-5"
                />
                <Image
                    src={ts as StaticImageData}
                    alt="ts"
                    className="w-8 quad:w-9 max-lg:w-6 max-sm:w-5"
                />
                <Image
                    width="38"
                    height="20"
                    src={react as StaticImageData}
                    alt="react"
                    className="w-9 quad:w-12 max-lg:w-8 max-sm:w-6"
                />
                <Image
                    src={next as StaticImageData}
                    alt="nextJs"
                    className="w-8 quad:w-10 max-lg:w-6 max-sm:w-5"
                />
                <Image
                    src={tailwind as StaticImageData}
                    alt="tailwindCSS"
                    className="w-10 quad:w-12 max-lg:w-9 max-sm:w-6"
                />
                <Image
                    src={mui as StaticImageData}
                    alt="Material UI"
                    className="w-7 quad:w-9 max-lg:w-5 max-sm:w-4"
                />
            </div>
        </div>
    );
}
