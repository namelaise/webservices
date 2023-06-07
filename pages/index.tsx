import { title } from "process";
import { Key, useEffect, useState } from "react";
const Home = () => {
  const [movies, setMovies] = useState<any>([]);
  const API_URL = "https://api.example.com";

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/discover");
      const data = await response.json();
      setMovies(data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // PUT request
  const addLike = async (id: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idMovie: id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data updated:", data);
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchMovies().catch((error) => {});
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {movies ? (
          movies.map((movie: any) => (
            <div
              style={{
                border: "1px solid black",
                width: "74%",
                height: "70%",
              }}
              key={movie.id}>
              <h3>{movie.title}</h3>
              {/* <p>{movie.overview}</p> */}
              <div>
                <button onClick={() => addLike(movie.id)}>Like</button>
                <p></p>
              </div>
            </div>
          ))
        ) : (
          <p>"Loading data..."</p>
        )}
      </div>
    </div>
  );
};

export default Home;
