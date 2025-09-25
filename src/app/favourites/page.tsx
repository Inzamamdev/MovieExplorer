"use client";

import { useMovies } from "@/context/MovieContext";
import MovieCard from "@/components/MovieCard";

export default function FavoritesPage() {
  const { favorites, isSearchMode, movies } = useMovies();
  console.log(isSearchMode);
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
          {favorites.length === 0 ? (
            <p>No favorites yet. Add some movies!</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-12">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
