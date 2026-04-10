"use client";
import React from "react";
import {usePathname, useRouter} from "next/navigation";

const languages = [
    {code: "ru", label: "Ру"},
    {code: "ua", label: "Ук"},
    {code: "en", label: "En"},
];

const ChangeLanguage = () => {
    const pathname = usePathname();
    const router = useRouter();

    const currentLang = pathname.split("/")[1] || "en";
    const currentIndex = languages.findIndex((l) => l.code === currentLang);
    const current = languages[currentIndex] || languages[0];

    const nextIndex = (currentIndex + 1) % languages.length;
    const next = languages[nextIndex];

    const handleClick = () => {
        router.push(`/${next.code}`, {scroll: false});
    };

    return (
        <button
            onClick={handleClick}
            className="px-2 py-1 border border-black rounded-full relative group"
        >
      <span
          className="text-xl quad:text-2xl max-lg:text-lg font-medium group-hover:opacity-80 duration-300 relative z-20">
        {current.label}
      </span>
            <span
                className="absolute w-0 h-0 group-hover:w-full group-hover:h-full duration-300 rounded-full bg-gray-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
        </button>
    );
};

export default ChangeLanguage;
