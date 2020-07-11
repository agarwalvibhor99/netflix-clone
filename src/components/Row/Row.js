import React, { useState, useEffect } from "react";
import axios from "../../axios";
import styles from "./Row.module.css";

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]); //Any variable from outside use in useEffect put that in the bracket //To update everytime array movies changes
  console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className={styles.rowPosters}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={styles.rowPoster}
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
