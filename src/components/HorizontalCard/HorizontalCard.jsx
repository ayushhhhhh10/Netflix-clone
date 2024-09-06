import { Link } from "react-router-dom";
import axios from "../../utils/Axios";
import React, { useEffect, useState } from "react";

const HorizontalCard = ({ title, fetchURL, isLarge, type }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(fetchURL);
      setMovies(res.data.results);
      return res;
    };
    fetchData();
  }, [fetchURL]);

  return (
    <div className="text-white pl-5">
      <h1
        className={
          isLarge
            ? "font-semibold text-xl mt-4 mb-1"
            : "font-semibold text-sm sm:text-md mt-4 mb-1"
        }
      >
        {title}
      </h1>
      <div className="cards flex overflow-x-auto overflow-y-hidden">
        {movies?.map(
          (movie) =>
            ((isLarge && movie.poster_path) ||
              (!isLarge && movie.backdrop_path)) && (
              <Link
                to={`/${type}/${movie.id}`}
                key={movie.id}
                className={
                  isLarge
                    ? "max-h-[280px] flex-shrink-0 w-52 overflow-hidden"
                    : "h-[130px] flex-shrink-0 w-52 overflow-hidden"
                }
              >
                <img
                  className={
                    isLarge
                      ? "max-h-[250px] mr-5 hover:scale-110 duration-300 object-contain"
                      : "max-h-[100px] mr-5 hover:scale-105 duration-300 object-contain"
                  }
                  src={`https://image.tmdb.org/t/p/original/${
                    isLarge ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
                <h1
                  className={`${
                    isLarge ? "text-sm" : "text-xs"
                  } font-semibold mt-1`}
                >
                  {movie.title || movie.name || movie.original_name}
                </h1>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default HorizontalCard;
