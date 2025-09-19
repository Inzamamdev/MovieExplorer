"use client";
import Image from "next/image";
import { useMovies } from "@/context/MovieContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";
import { useState } from "react";
import Link from "next/link";
type MovieCardProps = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  };
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { favorites, toggleFavorite } = useMovies();
  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent Link click bubbling
    if (!session) {
      setIsModalOpen(true); // 🚀 show modal if not logged in
      return;
    }
    toggleFavorite(movie);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault(); // block navigation
      setIsModalOpen(true); // 🚀 show modal
    }
  };
  return (
    <div className="w-full sm:w-48 rounded-lg shadow-md overflow-hidden relative">
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
      <Link href={`/movie/${movie.id}`} onClick={handleCardClick}>
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
          <p className="text-gray-600">⭐ {movie.vote_average?.toFixed(1)}</p>
        </div>
      </Link>
    </div>
  );
}
