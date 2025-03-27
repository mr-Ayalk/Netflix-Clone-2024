import React, { useEffect, useState } from "react";
import axios from "../../utils/axios"
import "./Banner.css";
import requests from "../../utils/requests"
const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const results = request.data.results;
        if (results && results.length > 0) {
          setMovie(results[Math.floor(Math.random() * results.length)]);
        }
      } catch (error) {
        console.error("Error fetching Netflix Originals:", error);
      }
    };

    fetchMovie();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button my-list">My List</button>
          
        </div>

        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
