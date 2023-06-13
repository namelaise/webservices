import { title } from "process";
import { Key, useEffect, useState } from "react";
const Home = () => {
  const [movies, setMovies] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);

  const API_URL = "https://api.example.com";

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/discover");
      const data = await response.json();
      setMovies(data.movies);
      return data.movies;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // POST request
  const addLike = async (id: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idMovie: id }),
      });

      const data = await response.json();
      console.log("Data updated:", data);
    } catch (error) {
      console.error("Error:", error);
    }

    getLike().catch((error) => {});
    fetchMovies().catch((error) => {});
  };
  // POST request
  const addComments = async (id: string) => {
    const inputElement = document.getElementById("myInput");

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idMovie: id }),
      });

      const data = await response.json();
      console.log("Data updated:", data);
    } catch (error) {
      console.error("Error:", error);
    }

    getLike().catch((error) => {});
    fetchMovies().catch((error) => {});
  };

  const getLike = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/like`, {
        method: "GET",
      });

      const data = await response.json();
      setLikes(data.existingData);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getLike().catch((error) => {});
    fetchMovies().catch((error) => {});
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <div style={{ justifyContent: "center" }}>
        {movies ? (
          movies.map((movie: any) => (
            <div
              style={{
                border: "1px solid black",
                width: "50%",
                height: "70%",
                margin: "1.2em",
              }}
              key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <div>
                <button onClick={() => addLike(movie.id)}>
                  Like:
                  {likes.find((like: any) => movie.id === like.idMovie)?.like ||
                    0}
                </button>
              </div>

              <div style={{ display: "flex" }}>
                <button>Comments :</button>
                <input></input>
              </div>

              <ul>test</ul>
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
