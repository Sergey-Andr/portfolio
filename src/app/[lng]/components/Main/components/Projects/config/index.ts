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
    links?: { git?: string; demo?: string };
    cover: StaticImageData;
    media?: ProjectMedia[];
}

export const projects: IProjects[] = [
    {
        name: "verso",
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        links: {
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
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        links: {
            git: "https://github.com/Sergey-Andr/watop",
            demo: "https://watop.vercel.app/",
        },
        cover: watop as StaticImageData,
        media: [
            {
                type: "video",
                src: "/projects/watop/purchase.mp4",
                poster: "/projects/watop/purchase-poster.webp",
            },
            {
                type: "video",
                src: "/projects/watop/search.mp4",
                poster: "/projects/watop/search-poster.webp",
            },
            {
                type: "video",
                src: "/projects/watop/account.mp4",
                poster: "/projects/watop/account-poster.webp",
            },
        ],
    },
    {
        name: "aat",
        stack: ["React", "Material UI"],
        cover: aat as StaticImageData,
        media: [
            {
                type: "video",
                src: "/projects/aat/dashboard.mp4",
                poster: "/projects/aat/dashboard-poster.webp",
            },
            {
                type: "video",
                src: "/projects/aat/schedule.mp4",
                poster: "/projects/aat/schedule-poster.webp",
            },
            {
                type: "video",
                src: "/projects/aat/tables.mp4",
                poster: "/projects/aat/tables-poster.webp",
            },
        ],
    },
];
