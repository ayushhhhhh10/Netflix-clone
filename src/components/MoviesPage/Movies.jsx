import React, { useEffect, useState } from "react";
import axios from "../../utils/Axios";
import Navbar from "../Navbar/Navbar";
import requests from "../../utils/Requests";
import { CircularProgress } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";

const TvShows = () => {
  const [shows, setShows] = useState(null);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(requests.fetchTrendingMovie);
      setShows(res.data.results);
      setBanner(
        res.data.results[
          Math.floor(Math.random() * res.data.results.length - 1)
        ]
      );
      return res;
    };
    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + " ..." : string;
  };

  return (
    <div className="min-h-screen w-full bg-[#111]">
      <Navbar />
      {!banner ? (
        <div className="h-screen flex items-center justify-center bg-[#111] -mb-32">
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${banner?.backdrop_path}")`,
            backgroundPosition: "center center",
          }}
          className="h-[50vh] sm:h-screen w-full flex flex-col justify-between text-white bg-[#111] mb-0 sm:-mb-32"
        >
          <div className="banner_contents h-3/4 flex flex-col gap-1 pt-28 sm:pt-72 w-full sm:w-3/4 xl:w-1/2 px-5">
            <h1 className="text-2xl sm:text-5xl font-black mix-blend-difference">
              {banner?.title || banner?.name || banner?.original_name}
            </h1>
            <Link
              to={`/movie/${banner?.id}`}
              className="flex items-center justify-center gap-2 text-md sm:text-lg w-fit px-5 py-1 my-2 sm:py-2 bg-[#11111181] rounded-md font-semibold hover:bg-[#e6e6e6] hover:text-black duration-300"
            >
              {<PlayArrow />} Play
            </Link>
            <p className="text-xs sm:text-sm tracking-wide xl:w-1/2 mix-blend-difference">
              {truncate(banner?.overview, 350)}
            </p>
          </div>
          <div
            style={{
              backgroundImage: `linear-gradient(180deg,transparent,rgba(37,37,37,0.61),#111)`,
            }}
            className="banner_fadeout h-[7.4rem]"
          ></div>
        </div>
      )}
      <Cards shows={shows} />
    </div>
  );
};

export default TvShows;
