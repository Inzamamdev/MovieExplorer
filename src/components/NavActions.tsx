"use client";
import { MdDarkMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";
import Image from "next/image";
import toast from "react-hot-toast";
import { useMovies } from "@/context/MovieContext";

export default function NavActions({ mobile = false }: { mobile?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const { searchMovies, resetMovies } = useMovies();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      resetMovies();
    }
  }, [searchTerm]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setIsModalOpen(true); // 🚀 show modal if not logged in
      return;
    }
    if (searchTerm.trim().length > 20) {
      toast.error("query is longer than 20 characters");
      return;
    }
    await searchMovies(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    resetMovies();
  };

  const handleInputClick = () => {
    if (!session) {
      setIsModalOpen(true); // 🚀 show modal if not logged in
    }
  };

  return (
    <div
      className={`items-center gap-3 ${
        mobile ? "flex flex-col w-full space-y-2" : "hidden md:flex"
      }`}
    >
      <form onSubmit={handleSearch} className={`${mobile ? "w-full" : ""}`}>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for movies or TV shows"
            className={`w-full rounded-md bg-[#141a26] px-3 py-1 pr-8 text-sm text-gray-300 placeholder-gray-500 
        focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={handleInputClick} // 🚀 trigger modal if not logged in
            readOnly={!session}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </form>
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
        className="p-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
      >
        {theme === "dark" ? <BsSun size={20} /> : <MdDarkMode size={20} />}
      </button>
    </div>
  );
}
