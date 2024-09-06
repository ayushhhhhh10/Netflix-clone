import React, { useState } from "react";
import logo from "/logo.png";
import SigninScreen from "./SigninScreen";

const LoginScreen = () => {
  const [signin, setsignin] = useState(false);
  const clickHandler = () => {
    setsignin(true);
  };
  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: "url('/Background.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full relative z-20">
        <nav className="flex justify-between items-center p-5">
          <img className="w-24" src={logo} alt="" />
          <button
            onClick={clickHandler}
            className="py-2 px-5 text-xs sm:text-md text-white bg-[#e50914] hover:bg-[#a1282e] duration-300 font-semibold"
          >
            Sign In
          </button>
        </nav>
        {signin ? (
          <SigninScreen />
        ) : (
          <div className="flex flex-col justify-center items-center h-[80%] w-full text-white text-center">
            <h1 className="font-semibold text-3xl sm:text-5xl">
              Unlimited movies, TV shows and more
            </h1>
            <h3 className="text-lg sm:text-3xl my-5">
              Watch anywhere. Cancel anytime.
            </h3>
            <p className="text-sm w-2/3 sm:text-lg">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <button
              onClick={clickHandler}
              className="py-2 px-5 text-xl sm:py-3 sm:text-md xl:text-xl bg-[#e50914] hover:bg-[#9f1920] duration-300 font-semibold mt-5 rounded-md"
            >
              Get Started 
            </button>
          </div>
        )}
      </div>
      <div className="gradient bg-[#0000009b] h-full w-full absolute top-0 z-10"></div>
    </div>
  );
};

export default LoginScreen;
