"use client";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdMenu } from "react-icons/md";
import NavActions from "./NavActions";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Popular", href: "#" },
  { name: "Now Playing", href: "#" },
  { name: "Top Rated", href: "#" },
  { name: "Upcoming", href: "#" },
];

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Popular");
  return (
    <header className="w-full  ">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400 text-xl font-bold">▶ JustWatch</span>
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
                href={link.href}
                onClick={() => setActive(link.name)}
                className={`hover:text-yellow-400 ${
                  active === link.name ? " text-yellow-400" : ""
                }`}
              >
                {link.name}
              </a>
            ))}
            {/* Actions for mobile */}
            {isOpen && <NavActions mobile />}
          </nav>

          {/* Actions for desktop */}
          <NavActions />

          {/* Menu */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <RxCross1 /> : <MdMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Nav;
