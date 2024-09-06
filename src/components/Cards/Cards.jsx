import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ shows }) => {
  return (
    <div className="cards w-full justify-center flex gap-x-5 flex-wrap text-white">
      {shows?.map((show) => (
        <Link
          to={`/tv/${show.id}`}
          key={show.id}
          className="h-[350px] flex-shrink-0 w-52 overflow-hidden"
        >
          <img
            className="max-h-[500px] mr-5 hover:scale-105 duration-300 object-contain"
            src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
            alt={show.name}
          />
          <h1 className="text-xs font-semibold mt-1">
            {show.title || show.name || show.original_name}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
