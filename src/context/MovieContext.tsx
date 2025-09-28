"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { getMovies } from "@/app/actions/getMovies";
import { searchMoviesAPI } from "@/app/actions/getMovies";
import { usePathname } from "next/navigation";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type MovieListProps = {
  initialMovies: Movie[];
};

type NavLinK = {
  name: string;
  category: string;
};

type MoviesContextType = {
  movies: Movie[];
  loadMoreMovies: () => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  resetMovies: () => Promise<void>;
  isSearchMode: boolean;
  loading: boolean;
  active: NavLinK;
  setIsSearchMode: Dispatch<SetStateAction<boolean>>;
  setActive: Dispatch<SetStateAction<NavLinK | null>>;
};

const MoviesContext = createContext<MoviesContextType | null>(null);

export function MoviesProvider({
  initialMovies,
  children,
}: {
  initialMovies: Movie[];
  children: React.ReactNode;
}) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const pathname = usePathname();
  const [active, setActive] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("activeCategory");
      if (stored) {
        return JSON.parse(stored);
      }
    }

    return pathname === "/" ? { name: "Popular", category: "popular" } : null;
  });

  useEffect(() => {
    localStorage.setItem("activeCategory", JSON.stringify(active));

    resetMovies();
  }, [active]);

  const loadMoreMovies = async () => {
    if (active?.category == null) return;
    if (loading) return;
    setLoading(true);
    const apiMovies = await getMovies(active.category, page);
    setMovies((prev) => [...prev, ...apiMovies]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      await resetMovies();
      return;
    }

    setLoading(true);
    const results = await searchMoviesAPI(query);
    setMovies(results);
    setIsSearchMode(true);
    setLoading(false);
  };

  const resetMovies = async () => {
    if (active?.category == null) return;
    setLoading(true);
    const freshMovies = await getMovies(active?.category, 1);
    setMovies(freshMovies);
    setPage(2);
    setIsSearchMode(false);
    setLoading(false);
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        loadMoreMovies,
        searchMovies,
        resetMovies,
        isSearchMode,
        loading,
        active,
        setActive,
        setIsSearchMode,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const ctx = useContext(MoviesContext);
  if (!ctx) throw new Error("useMovies must be used within a MoviesProvider");
  return ctx;
}
