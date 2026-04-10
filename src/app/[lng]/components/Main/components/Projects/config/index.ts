import aat from "../../../../../../../../public/AAT.webp";
import watop from "../../../../../../../../public/watop.webp";
import {StaticImageData} from "next/dist/shared/lib/get-img-props";

interface IProjects {
    name: string;
    stack: string[];
    links?: { git: string; demo?: string };
    photo: StaticImageData;
}

export const projects: IProjects[] = [
    {
        name: "watop",
        stack: ["Next.js", "Tailwind CSS"],
        links: {
            git: "https://github.com/Sergey-Andr/watop",
            demo: "https://watop.vercel.app/",
        },
        photo: watop as StaticImageData,
    },
    {
        name: "aat",
        stack: ["React", "Material UI"],
        photo: aat as StaticImageData,
    },
];
