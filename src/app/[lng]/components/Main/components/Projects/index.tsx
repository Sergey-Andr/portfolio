import Link from "next/link";
import {FaGithub, FaLink} from "react-icons/fa6";
import {projects} from "./config";
import {TFunction} from "@/app/i18n";
import {ImageLightbox} from "@/components/ui/ImageLightbox";

export default async function Projects({language}: { language: TFunction }) {
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
            <ul>
                {projects.map((project, index) => (
                    <li
                        key={project.name}
                        className={`flex justify-between max-md:flex-col max-md:items-center mb-32 quad:mb-64 max-lg:mb-16 last:mb-0 ${index % 2 !== 0 ? "flex-row-reverse" : ""}`}
                    >
                        <aside className="max-sm:mb-4">
                            <ImageLightbox
                                src={project.photo}
                                alt={language(`main.${project.name}.title`)}
                                className="min-w-96 max-w-lg max-h-64 quad:max-w-2xl max-lg:w-96 max-sm:w-full rounded-xl object-cover object-contain"
                            />
                        </aside>
                        <div className="w-full flex items-center justify-center">
                            <div className="w-72 quad:w-96 max-lg:w-60 flex flex-col items-center justify-center">
                                <h3 className="text-xl quad:text-3xl max-lg:text-lg font-semibold mb-4 max-lg:mb-2">
                                    {language(`main.projects.${project.name}.title`)}
                                </h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: language(`main.projects.${project.name}.text`),
                                    }}
                                    className="text-center text-black/60 quad:text-xl quad:tracking-wide max-lg:text-sm mb-4"
                                ></p>
                                <strong className="mb-4">
                                    {project.stack.map((tech) => (
                                        <span
                                            key={`${project.name}_${tech}`}
                                            className="mr-4 last:mr-0 quad:text-xl max-lg:text-sm"
                                        >
                      {tech}
                    </span>
                                    ))}
                                </strong>
                                {project.links ? (
                                    <nav className="flex">
                                        <Link
                                            href={project.links.git}
                                            target="_blank"
                                            className="flex items-center mr-4 hover:text-black/60 duration-300"
                                        >
                                            <p className="mr-2 font-medium quad:text-xl max-lg:text-sm">
                                                {language(`main.projects.code`)}
                                            </p>
                                            <FaGithub className="quad:text-xl"/>
                                        </Link>
                                        {project.links.demo ? (
                                            <Link
                                                href={project.links.demo}
                                                target="_blank"
                                                className="flex items-center hover:text-black/60 duration-300"
                                            >
                                                <p className="mr-2 font-medium quad:text-xl max-lg:text-sm">
                                                    {language(`main.projects.demo`)}
                                                </p>
                                                <FaLink className="quad:text-xl"/>
                                            </Link>
                                        ) : (
                                            <></>
                                        )}
                                    </nav>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
