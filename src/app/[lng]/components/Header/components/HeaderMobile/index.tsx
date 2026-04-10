"use client";
import { memo, ReactElement, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaAngleRight, FaHouse, FaPhone, FaUser } from "react-icons/fa6";
import { SiCurseforge } from "react-icons/si";

const lng = {
  en: ["Home", "About", "Projects", "Contacts"],
  ua: ["Головна", "Про мене", "Проекти", "Контакти"],
  ru: ["Главная", "Обо мне", "Проекты", "Контакты"],
};

const HeaderMobile = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [language, setLanguage] = useState([]);
  const route = usePathname();

  useEffect(() => {
    setLanguage(lng[route.slice(1)]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "static";
    }
  }, [isOpen]);

  const handleTouchStart = (e: any) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    const currentX = e.touches[0].clientX;
    const difference = startX - currentX;
    if (difference > -50) {
      setIsOpen(true);
    }
    if (difference > 50) {
      setIsOpen(false);
    }
  };

  const handleTouchEnd = () => {
    setStartX(0);
  };

  if (language.length === 0) {
    return <></>;
  }

  const height = document.body.scrollHeight;
  return (
    <header className="sm:hidden">
      <span
        onClick={() => {
          setIsOpen(true);
        }}
        className="absolute top-0 left-0 bg-sky-400/60 w-8 h-8 rounded-full -translate-x-1/2"
      >
        <FaAngleRight className="fill-black relative translate-x-full translate-y-1/2" />
      </span>
      <span
        onClick={() => {
          setIsOpen(false);
        }}
        className={`w-dvw h-full absolute top-0 left-0 z-20 bg-black/60 ${isOpen ? "block" : "hidden"}`}
        style={{
          height: `${height}px`,
        }}
      />
      <aside
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`w-4/5 h-full absolute z-50 top-0 left-0 bg-white p-4 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"} duration-300`}
        style={{
          height: `${height}px`,
        }}
      >
        <h2 className="text-2xl font-bold mb-8">Serhii.dev</h2>
        <nav>
          <a
            href="#"
            onClick={() => {
              setIsOpen(false);
            }}
            className="mr-4 text-xl w-full mb-4 hover:text-black/60 duration-300 flex items-center"
          >
            <FaHouse className="mr-4" />
            {language[0]}
          </a>
          <a
            href="#about"
            onClick={() => {
              setIsOpen(false);
            }}
            className="mr-4 text-xl w-full mb-4 hover:text-black/60 duration-300 flex items-center"
          >
            <FaUser className="mr-4" />
            {language[1]}
          </a>
          <a
            href="#projects"
            onClick={() => {
              setIsOpen(false);
            }}
            className="mr-4 text-xl w-full mb-4 hover:text-black/60 duration-300 flex items-center"
          >
            <SiCurseforge className="mr-4" />
            {language[2]}
          </a>
          <a
            href="#contacts"
            onClick={() => {
              setIsOpen(false);
            }}
            className="text-xl w-full hover:text-black/60 duration-300 flex items-center"
          >
            <FaPhone className="mr-4" />
            {language[3]}
          </a>
        </nav>
      </aside>
      <div
        style={{
          height: `${height}px`,
        }}
        className="w-12 absolute z-30 top-0 left-0 bg-transparent"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </header>
  );
};

export default memo(HeaderMobile);
