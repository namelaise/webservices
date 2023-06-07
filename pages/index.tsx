import { title } from "process";
import { Key, useEffect, useState } from "react";
const Home = () => {
  const [movies, setMovies] = useState<any>([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/discover");
      const data = await response.json();
      setMovies(data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies().catch((error) => {});
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {movies.map((movie: { id: Key | undefined; title: any }) => (
        <div key={movie.id}>
          <h3>{title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Home;
