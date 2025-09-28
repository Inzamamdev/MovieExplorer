"use client";

import { useMovies } from "@/context/MovieContext";
import MovieCard from "@/components/MovieCard";
import { useFavourites } from "@/context/FavouriteContext";
import { useState, useEffect } from "react";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};
export default function FavoritesPage() {
  const { isSearchMode, movies } = useMovies();
  const { favourites, setFavourites } = useFavourites();

  return (
    <>
      {isSearchMode ? (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-12">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-5">My Favorites</h1>
          {favourites.length === 0 ? (
            <p>No favorites yet. Add some movies!</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-12">
              {favourites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
