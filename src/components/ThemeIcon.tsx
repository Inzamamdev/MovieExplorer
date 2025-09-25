import { BsSun } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import React from "react";

function ThemeIcon() {
  const { theme, setTheme } = useTheme();
  if (!theme) {
    return <div className="w-9 h-9"></div>;
  }
  return (
    <div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-md hover:bg-gray-700 cursor-pointer transition-opacity duration-300 opacity-0 animate-fadeIn"
      >
        {theme === "dark" ? <MdDarkMode size={20} /> : <BsSun size={20} />}
      </button>
    </div>
  );
}

export default ThemeIcon;
