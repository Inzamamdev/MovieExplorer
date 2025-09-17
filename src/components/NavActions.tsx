"use client";
import { MdDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { useTheme } from "next-themes";
export default function NavActions({ mobile = false }: { mobile?: boolean }) {
  const { theme, setTheme } = useTheme();
  console.log(theme);
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
      <button
        className={`rounded-md bg-[#141a26] px-3 py-1 text-yellow-400 cursor-pointer
        ${mobile ? "w-full" : ""}`}
      >
        Sign In
      </button>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-md hover:bg-gray-700 transition"
      >
        {theme === "dark" ? <BsSun size={20} /> : <MdDarkMode size={20} />}
      </button>
    </div>
  );
}
