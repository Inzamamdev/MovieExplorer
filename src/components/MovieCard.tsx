import Image from "next/image";
import { useMovies } from "@/context/MovieContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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
  return (
    <div className="w-48 rounded-lg shadow-md overflow-hidden relative">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={300}
        className="rounded-t-lg"
      />
      <button
        onClick={() => toggleFavorite(movie)}
        className="absolute top-2 right-2 text-red-500 hover:scale-110 transition-transform"
      >
        {isFavorite ? (
          <FaHeart size={22} /> // filled heart
        ) : (
          <FaRegHeart size={22} /> // outlined heart
        )}
      </button>
      <Link href={`/movie/${movie.id}`}>
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
          <p className="text-gray-600">⭐ {movie.vote_average?.toFixed(1)}</p>
        </div>
      </Link>
    </div>
  );
}
