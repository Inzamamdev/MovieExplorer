"use client";
import Image from "next/image";
import { useMovies } from "@/context/MovieContext";
import { useFavourites } from "@/context/FavouriteContext";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};
type MovieCardProps = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  };
  favourites?: Movie[];
  setFavorites?: Dispatch<SetStateAction<Movie[]>>;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { favourites, setFavourites } = useFavourites();
  const isFavorite = favourites?.some((fav) => fav.id === movie.id);
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFavorite = (movie: Movie) => {
    console.log("Clicked");
    setFavourites((prev) => {
      const exists = prev.find((fav) => fav.id === movie.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== movie.id); // remove
      }
      return [...prev, movie]; // add
    });
  };
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      setIsModalOpen(true);
      return;
    }
    toggleFavorite(movie);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full sm:w-48 rounded-lg shadow-md dark:shadow-gray-800 overflow-hidden relative">
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={300}
        className="rounded-t-lg w-full"
      />
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 text-red-500 hover:scale-110 transition-transform cursor-pointer"
      >
        {isFavorite ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
      </button>
      <Link
        href={session ? `/movie/${movie.id}` : ""}
        onClick={handleCardClick}
      >
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
          <p className="text-gray-600">⭐ {movie.vote_average?.toFixed(1)}</p>
        </div>
      </Link>
    </div>
  );
}
