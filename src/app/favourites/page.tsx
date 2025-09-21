"use client";

import { useMovies } from "@/context/MovieContext";
import MovieCard from "@/components/MovieCard";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function FavoritesPage() {
  const { favorites } = useMovies();
  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // redirect to home
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
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
  );
}
