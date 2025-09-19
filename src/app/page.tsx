import MovieList from "@/components/MovieList";
import { getMovies } from "./actions/getMovies";
const INITIAL_PAGE = 1;
export default async function Home() {
  const initialMovies = await getMovies(INITIAL_PAGE);
  return <MovieList initialMovies={initialMovies} />;
}
