import React, { useRef } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SigninScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((user) => {
        console.log("User signed in successfully:", user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      <form
        onSubmit={signIn}
        className="w-[90%] sm:w-[500px] h-2/3 bg-[#00000094] text-white flex flex-col items-center justify-center"
      >
        <h1 className="font-semibold text-2xl sm:text-3xl">Sign In</h1>
        <input
          ref={emailRef}
          className="mt-5 w-2/3 sm:w-80 text-sm sm:text-md px-3 py-2 sm:p-3 xl:py-4 xl:px-3 bg-[#00000048] rounded-md border border-zinc-600 font-semibold"
          placeholder="Email address"
          type="text"
        />
        <input
          ref={passwordRef}
          className="my-2 w-2/3 sm:w-80 text-sm sm:text-md px-3 py-2 sm:p-3 xl:py-4 xl:px-3 bg-[#00000048] rounded-md border border-zinc-600 font-semibold"
          placeholder="Password"
          type="password"
        />
        <button className="w-3/5 my-3 py-2 px-5 text-xl sm:py-3 sm:px-3 xl:py-3 xl:pl-4 xl:pr-6 sm:text-md xl:text-xl bg-[#e50914] hover:bg-[#9f1920] duration-300 font-semibold rounded-md">
          Sign In
        </button>
        <h5 className="text-sm">
          <span className="opacity-50">New to Netflix?</span>
          <span
            onClick={register}
            className="font-semibold ml-1 cursor-pointer"
          >
            Sign Up now
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SigninScreen;
