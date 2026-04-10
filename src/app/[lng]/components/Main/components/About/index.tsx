import Image from "next/image";
import cirle from "../../../../../../../public/circle.svg";
import laptop from "../../../../../../../public/laptop.webp";
import programmer from "../../../../../../../public/programmer.webp";
import {StaticImageData} from "next/dist/shared/lib/get-img-props";
import {TFunction} from "@/app/i18n";

export default async function About({language}: { language: TFunction }) {
    return (
        <section className="mb-96 max-lg:mb-72 max-sm:mb-32 flex max-md:flex-col">
            <aside className="relative w-fit h-fit mr-16 max-lg:mr-8 max-md:mb-8">
                <Image
                    src={laptop as StaticImageData}
                    alt="laptop"
                    className="rounded-xl min-w-96 quad:max-w-xl max-lg:min-w-80"
                />
                <div
                    className="w-28 h-28 quad:w-40 quad:h-40 max-lg:w-20 max-lg:h-20 bg-white rounded-full absolute -bottom-8 -right-8 flex items-center justify-center">
                    <div className="relative">
                        <Image
                            src={cirle as StaticImageData}
                            alt="animated circle"
                            className="animate-circle-text w-24 h-24 quad:w-36 quad:h-36 max-lg:w-20 max-lg:h-20"
                        />
                        <Image
                            src={programmer as StaticImageData}
                            alt="programmer icon"
                            className="absolute top-1/4 left-1/4 w-12 h-12 quad:w-16 quad:h-16 max-lg:w-10 max-lg:h-10"
                        />
                    </div>
                </div>
            </aside>
            <div>
                <h2
                    id="about"
                    className="text-2xl quad:text-4xl max-lg:text-lg uppercase text-sky-400 font-medium quad:mb-2 scroll-m-16"
                >
                    {language("main.about.title")}
                </h2>
                <h3 className="text-2xl quad:text-4xl max-lg:text-lg font-bold max-sm:mb-4 mb-2">
                    {language("main.about.subTitle")}
                </h3>
                <p className="text-lg quad:text-2xl quad:leading-8 max-lg:text-sm max-lg:tracking-normal text-black/60 max-w-xl tracking-wide block">
                    {language("main.about.text")}
                </p>
            </div>
        </section>
    );
}
