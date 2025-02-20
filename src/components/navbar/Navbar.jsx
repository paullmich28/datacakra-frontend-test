import React, { useState } from "react";
import { Hamburger, Logout, Xmark } from "../icons/Icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../../model/static";

const Navbar = ({
  onClick = () => {}
}) => {
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
          <button
            onClick={onClick}
            className="bg-red-500 flex gap-1 px-4 py-3 rounded-md font-semibold hover:bg-red-700 transition-all duration-300"
          >
            <Logout />
            <h1>LOGOUT</h1>
          </button>
        </div>
      </div>

      <div
        className={`visible md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isDisplayed ? "max-h-40" : "max-h-0"
        }`}
      >
        <Link
          to={ROUTES.LOGIN}
          className="block py-4 px-8 text-white hover:bg-gray-800 transition-all duration-300"
        >
          LOGIN
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
