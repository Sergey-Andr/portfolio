import aat from "../../../../../../../../public/AAT.webp";
import watop from "../../../../../../../../public/watop.webp";
import verso from "../../../../../../../../public/verso.png";
import versoMobile from "../../../../../../../../public/projects/verso/verso-mobile.webp";
import versoAir from "../../../../../../../../public/projects/verso/verso-25.webp";
import versoKharkiv from "../../../../../../../../public/projects/verso/verso-31.webp";
import {StaticImageData} from "next/dist/shared/lib/get-img-props";
import {ProjectMedia} from "@/components/ui/ImageLightbox";

interface IProjects {
    name: string;
    stack: string[];
    links?: { git: string; demo?: string };
    cover: StaticImageData;
    media?: ProjectMedia[];
}

export const projects: IProjects[] = [
    {
        name: "verso",
        stack: ["Next.js", "Tailwind CSS"],
        links: {
            git: "https://github.com/Sergey-Andr/Verso",
            demo: "https://esverso.com",
        },
        cover: verso as StaticImageData,
        media: [
            {
                type: "video",
                src: "/projects/verso/demo.mp4",
                poster: "/projects/verso/demo-poster.webp",
            },
            {type: "image", src: versoMobile as StaticImageData},
            {type: "image", src: versoAir as StaticImageData},
            {type: "image", src: versoKharkiv as StaticImageData},
        ],
    },
    {
        name: "watop",
        stack: ["Next.js", "Tailwind CSS"],
        links: {
            git: "https://github.com/Sergey-Andr/watop",
            demo: "https://watop.vercel.app/",
        },
        cover: watop as StaticImageData,
    },
    {
        name: "aat",
        stack: ["React", "Material UI"],
        cover: aat as StaticImageData,
    },
];
