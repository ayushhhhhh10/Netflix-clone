import React, { useEffect, useState } from "react";
import logo from "/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const logOut = () => {
    setNav(!nav);
  };
  const signOutHandler = () => {
    signOut(auth);
    navigate("/");
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);
  return (
    <div
      className={`flex items-center h-16 w-full ${
        show && "bg-[#111] shadow-zinc-900 shadow-md"
      } fixed z-[999] top-0 duration-500`}
    >
      <Link className="fixed left-5" to="/">
        <img className="w-20" src={logo} alt="" />
      </Link>
      <div className="links flex gap-5 sm:gap-10 text-white font-semibold text-xs sm:text-sm fixed left-32 sm:left-40">
        <Link to="/" className="hover:text-zinc-500 duration-200">
          Home
        </Link>
        <Link to="/tv" className="hover:text-zinc-500 duration-200">
          TV Shows
        </Link>
        <Link to="/movies" className="hover:text-zinc-500 duration-200">
          Movies
        </Link>
      </div>
      <img
        onClick={logOut}
        className="w-8 cursor-pointer fixed right-5"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt=""
      />
      {nav && (
        <div
          onClick={signOutHandler}
          className="cursor-pointer fixed right-5 top-14 py-2 px-5 text-xs sm:text-md text-white bg-[#e50914] hover:bg-[#a1282e] duration-300 font-semibold"
        >
          {<Logout />} SignOut
        </div>
      )}
    </div>
  );
};

export default Navbar;
