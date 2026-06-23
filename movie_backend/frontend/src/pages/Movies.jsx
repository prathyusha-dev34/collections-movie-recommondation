import React, { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=8b2506ba&s=${query}`
      );

      setMovies(res.data.Search || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <h2>🎬 Movies Page</h2>

      {/* SEARCH */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={searchMovies}>Search</button>
      </div>

      {/* RESULTS */}
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={{
                imdbID: movie.imdbID,
                title: movie.Title,
                genre: movie.Type,
                poster: movie.Poster,
                reason: movie.Year,
              }}
            />
          ))
        ) : (
          <p>Search movies to see results 🎥</p>
        )}
      </div>
    </div>
  );
}

export default Movies;