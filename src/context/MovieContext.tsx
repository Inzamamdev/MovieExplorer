"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getMovies } from "@/app/actions/getMovies";
import { searchMoviesAPI } from "@/app/actions/getMovies";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type MovieListProps = {
  initialMovies: Movie[];
};

type MoviesContextType = {
  movies: Movie[];
  loadMoreMovies: () => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  resetMovies: () => Promise<void>;
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isSearchMode: boolean;
  loading: boolean;
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
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === movie.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== movie.id); // remove
      }
      return [...prev, movie]; // add
    });
  };

  const loadMoreMovies = async () => {
    if (loading) return;
    setLoading(true);
    const apiMovies = await getMovies(page);
    setMovies((prev) => [...prev, ...apiMovies]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      await resetMovies();
      return;
    }
    console.log(query);
    setLoading(true);
    const results = await searchMoviesAPI(query);
    setMovies(results);
    setIsSearchMode(true);
    setLoading(false);
  };

  const resetMovies = async () => {
    setLoading(true);
    const freshMovies = await getMovies(1);
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
        favorites,
        toggleFavorite,
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
