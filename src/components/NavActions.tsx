import { MdDarkMode } from "react-icons/md";

export default function NavActions({ mobile = false }: { mobile?: boolean }) {
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
      <MdDarkMode size={20} className="text-white cursor-pointer" />
    </div>
  );
}
