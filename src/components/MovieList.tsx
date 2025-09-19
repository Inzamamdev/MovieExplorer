// components/MovieList.tsx
"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "./MovieCard";
import { getMovies } from "@/app/actions/getMovies";
import MovieSkeleton from "./MovieSkeleton";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type MovieListProps = {
  initialMovies: Movie[];
};

export default function MovieList({ initialMovies }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(2);
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);

  const loadMoreMovies = async () => {
    if (loading) return;
    setLoading(true);
    const apiMovies = await getMovies(page);
    setMovies((prev) => [...prev, ...apiMovies]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    if (inView) loadMoreMovies();
  }, [inView]);

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-12">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      {loading &&
        Array.from({ length: 5 }).map((_, idx) => <MovieSkeleton key={idx} />)}
      <div ref={ref} className="col-span-full text-center p-4"></div>
    </div>
  );
}
