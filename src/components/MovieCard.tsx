import Image from "next/image";

type MovieCardProps = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  };
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="w-48 rounded-lg shadow-md overflow-hidden">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={300}
        className="rounded-t-lg"
      />
      <div className="p-2">
        <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
        <p className="text-gray-600">⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}
