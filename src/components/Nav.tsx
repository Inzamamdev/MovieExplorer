"use client";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdMenu } from "react-icons/md";
import NavActions from "./NavActions";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";
import Link from "next/link";
const navLinks = [
  { name: "Popular", category: "popular" },
  { name: "Now Playing", category: "now_playing" },
  { name: "Top Rated", category: "top_rated" },
  { name: "Upcoming", category: "upcoming" },
];

const pages = [{ name: "Favourites", href: "/favourites" }];

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Popular");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleNavClick = (linkName: string) => {
    if (!session) {
      setIsModalOpen(true);
      return;
    }
    setActive(linkName);
  };
  return (
    <header className="w-full sticky top-0 z-50 bg-[#0b0f19] text-white">
      <div className=" flex items-center justify-between px-4 py-3 md:px-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <span className="text-yellow-400 text-xl font-bold">
              MovieExplorer
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav
            className={`${
              isOpen
                ? "flex flex-col absolute top-16 left-0 w-full bg-[#0b0f19] px-4 py-4 space-y-2 md:static md:flex-row md:space-y-0 md:space-x-6 md:bg-transparent"
                : "hidden md:flex md:space-x-6"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className={`hover:text-yellow-400 ${
                  active === link.name ? " text-yellow-400" : ""
                }`}
              >
                {link.name}
              </a>
            ))}
            {pages.map((page, index) => (
              <Link
                key={index}
                href={page.href}
                onClick={() => setActive(page.name)}
                className={`hover:text-yellow-400 ${
                  active === page.name ? " text-yellow-400" : ""
                }`}
              >
                {page.name}
              </Link>
            ))}
            {/* Actions for mobile */}
            {isOpen && <NavActions mobile />}
          </nav>

          <NavActions />

          {/* Menu */}
          <button
            className="md:hidden text-gray-300 cusor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <RxCross1 /> : <MdMenu />}
          </button>
        </div>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}

export default Nav;
