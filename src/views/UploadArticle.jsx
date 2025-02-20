import React from "react";
import { ROUTES } from "../model/static";
import { Link } from "react-router-dom";
import { LeftArrow } from "../components/icons/Icons";

const UploadArticle = () => {
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-700">
      <div className="w-full max-w-lg px-8 md:px-0">
        <form
          className="bg-white shadow-lg rounded px-6 pt-3 pb-6 mb-4"
          onSubmit={() => {}}
        >
          <Link to={ROUTES.HOME} className="underline flex items-center gap-1">
            <LeftArrow />
            Back
          </Link>
          <h1 className="text-3xl font-medium text-center pb-6">Add New Article</h1>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Title
            </label>
            <input
              // {...register("identifier")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              // {...register("password")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadArticle;
