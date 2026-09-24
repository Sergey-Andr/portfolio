"use client";
import { memo, ReactElement, useEffect, useState } from "react";
import { FaAngleRight, FaHouse, FaNewspaper, FaPhone, FaUser } from "react-icons/fa6";
import { SiCurseforge } from "react-icons/si";
import ChangeLanguage from "@/app/[lng]/components/Header/components/ChangeLanguage";

interface HeaderMobileLabels {
  home: string;
  about: string;
  projects: string;
  articles: string;
  contacts: string;
  openMenu: string;
  closeMenu: string;
}

const lockBody = (locked: boolean) => {
  document.body.style.position = locked ? "fixed" : "static";
  document.body.style.width = locked ? "100%" : "";
};

const linkClassName =
  "text-xl w-full mb-4 hover:text-black/60 duration-300 flex items-center";

const HeaderMobile = ({ labels }: { labels: HeaderMobileLabels }): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) lockBody(isOpen);
  }, [isOpen, mounted]);

  const closeFromLink = () => {
    lockBody(false);
    setIsOpen(false);
  };

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

  if (!mounted) {
    return <></>;
  }

  const height = document.body.scrollHeight;
  const links = [
    { href: "#", label: labels.home, Icon: FaHouse },
    { href: "#about", label: labels.about, Icon: FaUser },
    { href: "#projects", label: labels.projects, Icon: SiCurseforge },
    { href: "#articles", label: labels.articles, Icon: FaNewspaper },
    { href: "#contacts", label: labels.contacts, Icon: FaPhone },
  ];

  return (
    <header className="sm:hidden">
      <button
        type="button"
        aria-label={labels.openMenu}
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(true);
        }}
        className="absolute z-40 top-0 left-0 bg-sky-400/60 w-8 h-8 rounded-full -translate-x-1/2"
      >
        <FaAngleRight className="fill-black relative translate-x-full" />
      </button>
      <span
        aria-label={labels.closeMenu}
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
          {links.map(({ href, label, Icon }) => (
            <a key={href} href={href} onClick={closeFromLink} className={linkClassName}>
              <Icon className="mr-4" />
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-4">
          <ChangeLanguage />
        </div>
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
