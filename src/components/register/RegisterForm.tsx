import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterModel } from "../../model/types.ts";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterModel>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterModel) => {};

  return (
    <div className="w-full max-w-sm px-8 md:px-0">
      <form
        className="bg-white shadow-lg rounded px-6 pt-3 pb-6 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link to={"/"} className="underline">
          Back
        </Link>
        <h1 className="text-3xl font-medium text-center pb-6">Register Page</h1>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email")}
            className={`shadow appearance-none border ${errors.email ? "border-red-500" : null} rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="email"
            placeholder="example@email.com"
          />

          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            {...register("username")}
            className={`shadow appearance-none border ${errors.username ? "border-red-500" : null} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="Username"
          />

          {errors.username && (
            <p className="text-red-500 text-xs italic">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password")}
            className={`shadow appearance-none border ${errors.password ? "border-red-500" : null} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="******************"
          />

          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            className={`shadow appearance-none border ${errors.confirmPassword ? "border-red-500" : null} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="confirmPassword"
            type="password"
            placeholder="******************"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            className="w-full mb-2 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
            type="submit"
          >
            {!isSubmitting ? "Register" : "Loading..."}
          </button>

          {errors.root && (
            <p className="text-red-500 text-xs italic">{errors.root.message}</p>
          )}

          <span className="font-bold text-sm ">
            Already have an account?{" "}
            <Link
              className="text-blue-500 hover:text-blue-800 underline transition-all duration-300"
              to={"/login"}
            >
              Log in
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
