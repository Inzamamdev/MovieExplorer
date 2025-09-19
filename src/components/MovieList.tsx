// components/MovieList.tsx
"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "./MovieCard";
import { useMovies } from "@/context/MovieContext";
import MovieSkeleton from "./MovieSkeleton";

export default function MovieList() {
  const { movies, loadMoreMovies, loading, isSearchMode } = useMovies();
  const { ref, inView } = useInView();

  // useEffect(() => {
  //   setMovies(initialMovies);
  //   setPage(2);
  // }, [category, initialMovies]);

  useEffect(() => {
    if (inView && !isSearchMode) {
      loadMoreMovies();
    }
  }, [inView, isSearchMode]);

  return (
    <div className="my-5 grid grid-cols-3 md:grid-cols-5 gap-12">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      {loading &&
        Array.from({ length: 5 }).map((_, idx) => <MovieSkeleton key={idx} />)}
      <div ref={ref} className="col-span-full text-center p-4"></div>
    </div>
  );
}
