import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import bg from "../images/background.png";

function Gurjar() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center flex-col h-screen p-5">
      <div className="sm:border sm:w-200 sm:p-5 sm:shadow-xl sm:bg-white sm:rounded-lg">
        <div className=" mt-1 items-center flex flex-col">
          <img src={logo} className="h-28 w-28" />
          <h1 className="font-extrabold text-4xl text-center">Gurjar Maps.</h1>
        </div>
        <img
          src={bg}
          className="h-auto w-full max-w-md my-5 grayscale contrast-200 drop-shadow-none"
        />
        <div className="mb-5 w-full mt-auto px-2">
          <button
            onClick={() => navigate("/login")}
            type="submit"
            className="w-full justify-center p-3 text-xl border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#0B77FB] hover:bg-[#0853AF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            type="submit"
            className="w-full justify-center mt-5 p-3 text-xl border border-[#0B77FB] rounded-full shadow-sm text-sm font-medium text-[#0B77FB]  hover:bg-[#0853AF] hover:text-white hover:border-transparent"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gurjar;
