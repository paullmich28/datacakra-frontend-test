import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginModel, loginSchema } from "../../model/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { COOKIEID, ROUTES } from "../../model/static.js";
import { useCookies } from "react-cookie";
import axios from "axios";
import { LeftArrow } from "../icons/Icons.jsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const [, setCookies] = useCookies([COOKIEID]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginModel>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginModel) => {
    const result = loginSchema.safeParse(data);

    try {
      if (result.success) {
        const response = await axios.post(
          "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/auth/local",
          new URLSearchParams({
            identifier: data.identifier,
            password: data.password,
          }).toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        setCookies(COOKIEID, response.data.jwt, {
          path: "/",
          maxAge: Date.now() + 7,
        });
        navigate(ROUTES.DASHBOARD);
      }
    } catch (error) {
      setError("root", {
        message: error.response.data.error.message,
      });
    }
  };

  return (
    <div className="w-full max-w-sm px-8 md:px-0">
      <form
        className="bg-white shadow-lg rounded px-6 pt-3 pb-6 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <div className="flex"> */}
        <Link to={ROUTES.HOME} className="underline flex items-center gap-1">
          <LeftArrow />
          Back
        </Link>
        {/* </div> */}
        <h1 className="text-3xl font-medium text-center pb-6">Login Page</h1>

        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            {...register("identifier")}
            className={`shadow appearance-none border ${
              errors.identifier ? "border-red-500" : null
            } rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="Username"
          />

          {errors.identifier && (
            <p className="text-red-500 text-xs italic">
              {errors.identifier.message}
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
            className={`shadow appearance-none border ${
              errors.password ? "border-red-500" : null
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
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
        <div className="text-center">
          <button
            className="w-full mb-2 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
            type="submit"
            disabled={isSubmitting}
          >
            {!isSubmitting ? "Sign In" : "Loading..."}
          </button>

          {errors.root && (
            <p className="text-red-500 text-xs italic">{errors.root.message}</p>
          )}

          <span className="font-bold text-sm ">
            Don't have an account?{" "}
            <Link
              className="text-blue-500 hover:text-blue-800 underline transition-all duration-300"
              to={ROUTES.REGISTER}
            >
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
