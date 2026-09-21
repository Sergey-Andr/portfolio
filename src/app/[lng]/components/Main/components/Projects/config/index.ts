import aat from "../../../../../../../../public/AAT.webp";
import watop from "../../../../../../../../public/watop.webp";
import verso from "../../../../../../../../public/verso.png";
import {StaticImageData} from "next/dist/shared/lib/get-img-props";

interface IProjects {
    name: string;
    stack: string[];
    links?: { git: string; demo?: string };
    photos: StaticImageData[];
}

export const projects: IProjects[] = [
    {
        name: "verso",
        stack: ["Next.js", "Tailwind CSS"],
        links: {
            git: "https://github.com/Sergey-Andr/Verso",
            demo: "https://esverso.com",
        },
        photos: [verso as StaticImageData],
    },
    {
        name: "watop",
        stack: ["Next.js", "Tailwind CSS"],
        links: {
            git: "https://github.com/Sergey-Andr/watop",
            demo: "https://watop.vercel.app/",
        },
        photos: [watop as StaticImageData],
    },
    {
        name: "aat",
        stack: ["React", "Material UI"],
        photos: [aat as StaticImageData],
    },
];
