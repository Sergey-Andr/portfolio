import {TFunction} from "@/app/i18n";
import HeaderMobile from "@/app/[lng]/components/Header/components/HeaderMobile";
import ChangeLanguage from "@/app/[lng]/components/Header/components/ChangeLanguage";

export default function Header({language}: { language: TFunction }) {
    return (
        <>
            <header
                className="w-full h-16 flex max-lg:bg-white max-lg:z-50 max-sm:hidden items-center justify-between sticky top-0 backdrop-blur-sm">
                <p className="text-2xl quad:text-4xl max-lg:text-xl font-bold">
                    Serhii.dev
                </p>
                <div className="flex items-center gap-4">
                    <nav className="text-xl quad:text-2xl max-lg:text-lg font-medium">
                        <a
                            href="#"
                            className="mr-4 hover:text-black/60 duration-300 relative group"
                        >
                            {language("header.home")}
                            <span
                                className="absolute w-0 h-0.5 bg-black -bottom-0 left-0 group-hover:w-full duration-300"/>
                        </a>
                        <a
                            href="#about"
                            className="mr-4 hover:text-black/60 duration-300 relative group"
                        >
                            {language("header.about")}
                            <span
                                className="absolute w-0 h-0.5 bg-black -bottom-0 left-0 group-hover:w-full duration-300"/>
                        </a>
                        <a
                            href="#projects"
                            className="mr-4 hover:text-black/60 duration-300 relative group"
                        >
                            {language("header.projects")}
                            <span
                                className="absolute w-0 h-0.5 bg-black -bottom-0 left-0 group-hover:w-full duration-300"/>
                        </a>
                        <a
                            href="#articles"
                            className="mr-4 hover:text-black/60 duration-300 relative group"
                        >
                            {language("header.articles")}
                            <span
                                className="absolute w-0 h-0.5 bg-black -bottom-0 left-0 group-hover:w-full duration-300"/>
                        </a>
                        <a
                            href="#contacts"
                            className="hover:text-black/60 duration-300 relative group"
                        >
                            {language("header.contacts")}
                            <span
                                className="absolute w-0 h-0.5 bg-black -bottom-0 left-0 group-hover:w-full duration-300"/>
                        </a>
                    </nav>
                    <ChangeLanguage/>
                </div>
            </header>
            <HeaderMobile/>
        </>
    );
}
