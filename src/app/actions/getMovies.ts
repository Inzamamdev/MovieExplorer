"use server";

export const getMovies = async (category: string, page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/${category}?&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Failed to fetch movies from TMDB");
  const data = await res.json();

  return data.results;
};

export const searchMoviesAPI = async (query: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Failed to search movies");
  const data = await res.json();

  return data.results;
};
