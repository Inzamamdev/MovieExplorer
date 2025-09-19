"use client";
import { MdDarkMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";
import Image from "next/image";
export default function NavActions({ mobile = false }: { mobile?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div
      className={`items-center gap-3 ${
        mobile ? "flex flex-col w-full space-y-2" : "hidden md:flex"
      }`}
    >
      <input
        type="text"
        placeholder="Search for movies or TV shows"
        className={`rounded-md bg-[#141a26] px-3 py-1 text-sm text-gray-300 placeholder-gray-500 
        focus:outline-none focus:ring-2 focus:ring-yellow-400 
        ${mobile ? "w-full" : ""}`}
      />

      {status == "loading" ? (
        // Skeleton
        <div
          className={`h-9 w-20 rounded-md bg-gray-700 animate-pulse ${
            mobile ? "w-full" : ""
          }`}
        />
      ) : !session ? (
        <button
          className={`rounded-md bg-[#141a26] px-3 py-1 text-yellow-400 cursor-pointer
          ${mobile ? "w-full" : ""}`}
          onClick={() => setIsModalOpen(true)}
        >
          Sign In
        </button>
      ) : (
        <button
          className={`rounded-md bg-[#141a26] px-3 py-1 text-yellow-400 flex items-center gap-2 cursor-pointer
          ${mobile ? "w-full" : ""}`}
          onClick={() => setIsModalOpen(true)}
        >
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="profile"
              height={20}
              width={20}
              className=" rounded-full"
            />
          ) : (
            <FaUserCircle size={20} />
          )}
          <span className="hidden sm:inline">Account</span>
        </button>
      )}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-md hover:bg-gray-700 transition"
      >
        {theme === "dark" ? <BsSun size={20} /> : <MdDarkMode size={20} />}
      </button>
    </div>
  );
}
