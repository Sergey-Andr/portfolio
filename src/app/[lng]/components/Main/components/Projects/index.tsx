import Link from "next/link";
import {FaGithub, FaLink} from "react-icons/fa6";
import {projects} from "./config";
import {TFunction} from "@/app/i18n";
import {ImageLightbox} from "@/components/ui/ImageLightbox";

const linkClassName =
    "flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 font-medium transition duration-200 hover:border-sky-400 hover:text-sky-500 focus-visible:border-sky-400 focus-visible:outline-none quad:text-xl max-lg:text-sm";

export default async function Projects({language}: { language: TFunction }) {
    const lightboxLabels = {
        open: language("main.projects.openPhoto"),
        prev: language("main.projects.prevPhoto"),
        next: language("main.projects.nextPhoto"),
    };

    return (
        <section className="mb-96 max-lg:mb-72 max-sm:mb-32">
            <h2
                id="projects"
                className="text-2xl quad:text-4xl max-lg:text-lg uppercase text-sky-400 xl:mb-2 font-medium scroll-m-16"
            >
                {language("main.projects.title")}
            </h2>
            <h3 className="text-2xl quad:text-4xl max-lg:text-lg font-bold mb-16 lg:mb-8 max-sm:mb-4">
                {language("main.projects.subTitle")}
            </h3>
            <ul className="flex flex-col gap-8 quad:gap-16 max-lg:gap-6">
                {projects.map((project) => (
                    <li
                        key={project.name}
                        className="flex items-center gap-6 rounded-3xl border border-black/10 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] quad:gap-10 quad:p-4 max-md:flex-col max-md:items-stretch max-md:gap-4"
                    >
                        <div className="w-[55%] shrink-0 max-md:w-full">
                            <ImageLightbox
                                images={project.photos}
                                alt={language(`main.projects.${project.name}.title`)}
                                labels={lightboxLabels}
                                className="aspect-[16/10] w-full h-auto object-cover object-top"
                            />
                        </div>
                        <div className="flex flex-col justify-center py-2 pr-3 max-md:px-2 max-md:pb-3 max-md:pt-0">
                            <h3 className="text-xl quad:text-3xl max-lg:text-lg font-semibold mb-3 max-lg:mb-2">
                                {language(`main.projects.${project.name}.title`)}
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: language(`main.projects.${project.name}.text`),
                                }}
                                className="text-black/60 quad:text-xl quad:tracking-wide max-lg:text-sm mb-4"
                            ></p>
                            <ul className="flex flex-wrap gap-2 mb-5">
                                {project.stack.map((tech) => (
                                    <li
                                        key={`${project.name}_${tech}`}
                                        className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-sm font-medium quad:text-xl max-lg:text-xs"
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                            {project.links ? (
                                <nav className="flex flex-wrap gap-3">
                                    <Link
                                        href={project.links.git}
                                        target="_blank"
                                        className={linkClassName}
                                    >
                                        {language(`main.projects.code`)}
                                        <FaGithub className="quad:text-xl"/>
                                    </Link>
                                    {project.links.demo ? (
                                        <Link
                                            href={project.links.demo}
                                            target="_blank"
                                            className={linkClassName}
                                        >
                                            {language(`main.projects.demo`)}
                                            <FaLink className="quad:text-xl"/>
                                        </Link>
                                    ) : null}
                                </nav>
                            ) : null}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
