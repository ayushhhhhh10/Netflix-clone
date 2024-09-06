import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/Axios";
import requests from "../../utils/Requests";
import Navbar from "../Navbar/Navbar";
import ReactPlayer from "react-player";
import { Cancel, PlayArrow, ReplyOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const MoviePage = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovie, setSimilarMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isTrailer, setIsTrailer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const endpoint =
          type === "movie"
            ? `/movie/${id}?api_key=${requests.API_KEY}&language=en-US`
            : `/tv/${id}?api_key=${requests.API_KEY}&language=en-US`;

        const res = await axios.get(endpoint);
        setMovie(res.data);
      } catch (error) {
        console.error("Error fetching movie or TV show details:", error);
      }
    };
    fetchMovie();

    const fetchSimilarMovie = async () => {
      try {
        const endpoint =
          type === "movie"
            ? `/movie/${id}/similar?api_key=${requests.API_KEY}&language=en-US`
            : `/tv/${id}/similar?api_key=${requests.API_KEY}&language=en-US`;

        const res = await axios.get(endpoint);
        setSimilarMovie(res.data.results);
      } catch (error) {
        console.error(
          "Error fetching similar movie or TV show details:",
          error
        );
      }
    };
    fetchSimilarMovie();

    const fetchTrailer = async () => {
      try {
        const endpoint =
          type === "movie"
            ? `/movie/${id}/videos?api_key=${requests.API_KEY}&language=en-US`
            : `/tv/${id}/videos?api_key=${requests.API_KEY}&language=en-US`;

        const res = await axios.get(endpoint);
        setTrailer(
          res.data.results.filter((item) => {
            return item.type === "Trailer";
          })[0]?.key
        );
      } catch (error) {
        console.error("Error fetching trailer", error);
      }
    };
    fetchTrailer();
  }, [id, type]);

  if (!movie) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#111]">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div
        className="movie-page w-full min-h-screen"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute z-10 w-full min-h-screen bg-[#000000b3]"></div>
        {isTrailer && (
          <div className="absolute bg-[#000000ed] z-30 h-[90%] w-[90%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setIsTrailer(false)}
              className="absolute flex -right-2 -top-6 px-3 my-2 py-1 bg-[#e6e6e6] rounded-md font-semibold hover:text-white hover:bg-[#1b1b1bdf] duration-300"
            >
              <Cancel />
            </button>
            <ReactPlayer
              width="100%"
              height="100%"
              url={`https://www.youtube.com/watch?v=${trailer}`}
            />
          </div>
        )}
        <div className="absolute z-20 h-full w-full overflow-auto">
          <Navbar />
          <div className="px-5 sm:pr-0 sm:pl-5 pt-20 flex sm:flex-row flex-col gap-2 sm:gap-16">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-8 text-xs h-fit w-fit px-3 my-2 py-1 bg-[#1b1b1bdf] rounded-md font-semibold text-white hover:bg-[#e6e6e6] hover:text-black duration-300"
            >
              <ReplyOutlined />
            </button>
            <div className="left w-full sm:w-[400px] sm:h-[600px] h-[450px]">
              <img
                className="w-full h-full object-cover object-center"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title || movie.name || movie.original_name}
              />
            </div>
            <div className="right w-full sm:w-2/3 overflow-x-hidden text-white mt-1 sm:mt-5">
              <h1 className="text-2xl sm:text-4xl font-semibold">
                {movie.title || movie.name || movie.original_name}
              </h1>
              <p className="text-sm text-zinc-500 font-semibold my-1 sm:my-2">
                {movie.first_air_date || movie.release_date} |{" "}
                {movie.adult ? "18+" : "16+"} |{" "}
                {movie.number_of_episodes
                  ? movie.number_of_episodes + " episodes"
                  : movie.runtime + " min"}
              </p>
              <p className="text-xs w-3/4 sm:w-[500px]">{movie.overview}</p>
              {trailer && (
                <button
                  onClick={() => setIsTrailer(true)}
                  className="flex items-center justify-center gap-1 mt-5 py-3 px-5 text-white bg-[#e50914] hover:bg-[#a1282e] duration-300 font-semibold"
                >
                  {<PlayArrow />} Play Trailer
                </button>
              )}
              <h1 className="text-xl font-semibold mt-5">Recommended </h1>
              <div className="cards flex gap-2 overflow-x-auto flex-nowrap">
                {similarMovie?.map(
                  (item, index) =>
                    item.poster_path && (
                      <Link
                        to={`/${type}/${item.id}`}
                        key={index}
                        className="max-h-[280px] flex-shrink-0 w-40 overflow-hidden"
                      >
                        <img
                          className="max-h-[250px] mr-1 hover:scale-105 duration-300 object-contain"
                          src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                          alt={item.name}
                        />
                        <h1 className="text-sm font-semibold mt-1">
                          {item.title || item.name || item.original_name}
                        </h1>
                      </Link>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MoviePage;
