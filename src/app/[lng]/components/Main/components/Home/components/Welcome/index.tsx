import Image from "next/image";
import hi from "../../../../../../../../../public/hi.webp";
import face from "../../../../../../../../../public/face.webp";
import {StaticImageData, StaticImport,} from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import {FaGithub} from "react-icons/fa6";
import {TFunction} from "@/app/i18n";

export default async function Welcome({language}: { language: TFunction }) {
    return (
        <div className="flex items-center max-sm:items-start mb-24 max-sm:mb-12">
            <div className="w-3/5 mr-16 quad:mr-28">
                <h1 className="flex text-5xl quad:text-7xl max-lg:text-3xl max-sm:text-2xl font-bold items-center mb-2 max-lg:mb-0 text-nowrap">
                    {language("main.home.title")}
                    <Image
                        src={hi as StaticImport}
                        alt="Image hello"
                        className="w-10 h-10 ml-4 quad:w-16 quad:h-16 max-lg:w-8 max-lg:h-8 max-sm:w-6 max-sm:h-6"
                    />
                </h1>
                <h2 className="text-lg quad:text-2xl max-lg:text-sm max-sm:text-sm text-black/60 font-medium">
                    {language("main.home.subTitle")}
                </h2>
                <nav className="flex text-3xl quad:text-4xl max-lg:text-2xl mt-6 quad:mt-8 max-sm:text-xl">
                    <Link
                        href="https://github.com/Sergey-Andr"
                        target="_blank"
                        className="cursor-pointer hover:text-black/80 duration-300"
                    >
                        <FaGithub/>
                    </Link>
                </nav>
            </div>
            <div className="w-2/5">
                <Image
                    src={face as StaticImageData}
                    alt={"face"}
                    className="animate-blob border-2 border-black"
                />
            </div>
        </div>
    );
}
