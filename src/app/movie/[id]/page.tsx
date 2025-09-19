// app/movie/[id]/page.tsx
import Image from "next/image";
export interface Genre {
  id: number;
  name: string;
}
async function getMovie(id: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-4">{movie.tagline}</p>

          <p className="mb-4">{movie.overview}</p>

          <div className="space-y-2">
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} mins
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres?.map((g: Genre) => g.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
