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
      <div className="flex items-center justify-between px-4 py-3 md:px-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <span className="text-yellow-400 text-xl font-bold">
              MovieExplorer
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Navigation */}
          <nav
            className={`z-40 transition-all duration-200
          ${isOpen ? "flex" : "hidden"} flex-col absolute top-full left-0 w-full
          bg-[#0b0f19] px-6 py-4 space-y-3 shadow-lg
          md:static md:flex md:flex-row md:space-x-6 md:space-y-0 md:bg-transparent md:w-auto md:px-0 md:py-0 md:shadow-none`}
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className={`text-left md:text-center hover:text-yellow-400 transition-colors cursor-pointer
              ${active === link.name ? "text-yellow-400" : "text-white"}`}
              >
                {link.name}
              </button>
            ))}

            {pages.map((page, idx) => (
              <Link
                key={idx}
                href={page.href}
                onClick={() => setActive(page.name)}
                className={`hover:text-yellow-400 transition-colors cursor-pointer
              ${active === page.name ? "text-yellow-400" : "text-white"}`}
              >
                {page.name}
              </Link>
            ))}

            {/* Mobile-only actions: show NavActions only inside dropdown on mobile */}
            <div className="md:hidden mt-2">
              <NavActions mobile />
            </div>
          </nav>

          {/* Desktop actions (hidden on small screens) */}
          <div className="hidden md:flex md:items-center">
            <NavActions />
          </div>

          {/* Hamburger / close (mobile only) */}
          <button
            className="md:hidden text-gray-300 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <RxCross1 size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Auth modal */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}

export default Nav;
