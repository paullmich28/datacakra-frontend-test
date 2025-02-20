import React, { useState } from "react";
import { Hamburger, Xmark } from "../icons/Icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  return (
    <nav className="bg-gray-700 drop-shadow-xl">
      <div className="px-8 md:px-16 py-4 w-full flex justify-between items-center">
        <div className="flex gap-8">
          <button
            className="text-white md:hidden visible"
            onClick={() => setIsDisplayed(!isDisplayed)}
          >
            {!isDisplayed ? <Hamburger /> : <Xmark />}
          </button>
          <Link to={"/"}>
            <img src="/favicon.ico" alt="logo" className="w-3/4" />
          </Link>
        </div>
        <div className="flex gap-4 text-white invisible md:visible items-center">
          <Link
            to={"/login"}
            className="bg-blue-500 px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            LOGIN
          </Link>
          <Link
            to={"/register"}
            className="bg-white px-8 py-3 rounded-md font-semibold text-blue-500 border-2 border-blue-500 hover:text-white hover:bg-blue-700 hover:border-blue-700 transition-all duration-300"
          >
            REGISTER
          </Link>
        </div>
      </div>

      <div
        className={`visible md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isDisplayed ? "max-h-40" : "max-h-0"
        }`}
      >
        <Link
          to={"/login"}
          className="block py-4 px-8 text-white hover:bg-gray-800 transition-all duration-300"
        >
          LOGIN
        </Link>
        <Link
          to={"/register"}
          className="block py-4 px-8 text-white hover:bg-gray-800 transition-all duration-300"
        >
          REGISTER
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
