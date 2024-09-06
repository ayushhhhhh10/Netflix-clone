import React from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import HorizontalCard from "../HorizontalCard/HorizontalCard";
import requests from "../../utils/Requests";

const Home = () => {
  return (
    <div className="bg-[#111] pb-10">
      <Navbar />
      <Banner />
      <HorizontalCard
        title="Netflix Originals"
        fetchURL={requests.fetchNetflixOriginals}
        isLarge
        type="tv"
      />
      <HorizontalCard
        title="Trending Tv Shows"
        fetchURL={requests.fetchTrendingTv}
        type="tv"
      />
      <HorizontalCard
        title="Trending Movies"
        fetchURL={requests.fetchTrendingMovie}
        type="movie"
      />
      <HorizontalCard
        title="Action Movies"
        fetchURL={requests.fetchActionMovies}
        type="movie"
      />
      <HorizontalCard
        title="Comedy Movies"
        fetchURL={requests.fetchComedyMovies}
        type="movie"
      />
      <HorizontalCard
        title="Horror Movies"
        fetchURL={requests.fetchHorrorMovies}
        type="movie"
      />
      <HorizontalCard
        title="Drama Movies"
        fetchURL={requests.fetchDramaMovies}
        type="movie"
      />
      <HorizontalCard
        title="Documentries"
        fetchURL={requests.fetchDocumentaries}
        type="movie"
      />
    </div>
  );
};

export default Home;
