"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};
type FavouritesContextType = {
  favourites: Movie[];
  setFavourites: Dispatch<SetStateAction<Movie[] | []>>;
};
const FavouritesContext = createContext<FavouritesContextType | null>(null);
export function FavouriteProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = useState<Movie[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favourites));
  }, [favourites]);

  console.log(favourites);
  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx)
    throw new Error("useFavourites must be used within a FavouritesProvider");
  return ctx;
}
