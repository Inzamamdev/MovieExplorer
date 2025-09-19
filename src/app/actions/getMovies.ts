"use server";

export const getMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?&page=${page}`;
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
  console.log(data);
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
  console.log("aesrch", data);
  return data.results;
};
