"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getMovies } from "@/app/actions/getMovies";

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
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const loadMoreMovies = async () => {
    if (loading) return;
    setLoading(true);
    const apiMovies = await getMovies(page);
    setMovies((prev) => [...prev, ...apiMovies]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  return (
    <MoviesContext.Provider value={{ movies, loadMoreMovies, loading }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const ctx = useContext(MoviesContext);
  if (!ctx) throw new Error("useMovies must be used within a MoviesProvider");
  return ctx;
}
