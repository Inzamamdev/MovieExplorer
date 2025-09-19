import React from "react";
import MovieList from "@/components/MovieList";
import { getMovies } from "@/app/actions/getMovies";
import Nav from "@/components/Nav";
import { MoviesProvider } from "@/context/MovieContext";
async function Main() {
  const INITIAL_PAGE = 1;
  const initialMovies = await getMovies(INITIAL_PAGE);
  return (
    <div>
      <Nav />
      <div className="md:px-16">
        <MoviesProvider initialMovies={initialMovies}>
          <MovieList />
        </MoviesProvider>
      </div>
    </div>
  );
}

export default Main;
