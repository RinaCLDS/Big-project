import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import bg from "../images/background.png";

function Gurjar() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center flex-col h-screen p-7">
      <div className="mt-5 items-center flex flex-col">
        <img src={logo} className="h-28 w-28" />
        <h1 className="font-extrabold text-5xl text-center">Gurjar Maps.</h1>
      </div>
        <img src={bg} className="h-auto w-full max-w-md my-5" />
      <div className="mb-5 w-full mt-auto">
        <button
          onClick={() => navigate("/login")}
          type="submit"
          className="w-full justify-center p-3 text-xl border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          type="submit"
          className="w-full justify-center mt-5 p-3 text-xl border border-blue-600 rounded-full shadow-sm text-sm font-medium text-blue-600  hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Gurjar;
