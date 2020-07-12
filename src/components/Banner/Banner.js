import React, { useState, useEffect } from "react";
import axios from "../../axios";
import requests from "../../requests";
import styles from "./Banner.module.css";

const Banner = () => {
  const [movie, setMovie] = useState([]); //For a random movie

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles.bannerContents}>
        <h1 className={styles.bannerTitle}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={styles.bannerButtons}>
          <button className={styles.bannerButton}>Play</button>
          <button className={styles.bannerButton}>My List</button>
        </div>
        <h1 className={styles.bannerDescription}>
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className={styles.bannerFadeBottom} />
    </header>
  );
};

export default Banner;
