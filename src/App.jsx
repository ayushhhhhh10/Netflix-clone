import React, { useEffect } from "react";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./components/Login/LoginScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./store/userSlice";
import MoviePage from "./components/MoviePage/MoviePage";
import Movies from "./components/MoviesPage/Movies";
import TvShows from "./components/TvShowsPage/TvShows";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return user ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TvShows />} />
      <Route path="/:type/:id" element={<MoviePage />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
    </Routes>
  );
};

export default App;
