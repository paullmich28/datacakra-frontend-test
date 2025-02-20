import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RightArrow } from "../icons/Icons";
import { useCookies } from "react-cookie";
import { COOKIEID } from "../../model/static";
import axios from "axios";

const ArticleCard = ({
  id,
  title = "",
  imgUrl = "",
  creator = "",
  onClick = () => {},
}) => {
  const [cookies] = useCookies([COOKIEID]);
  const [nameCheck, setNameCheck] = useState("");

  const getMe = async () => {
    try {
      const response = await axios.get(
        "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      );

      setNameCheck(response.data.username);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async () => {
    try {
      await axios.delete(
        `https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/articles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe()
  }, [])

  return (
    <div className="flex flex-col md:items-center bg-gray-300 rounded-lg shadow-xl md:flex-row">
      <img
        className="object-cover object-top w-full rounded-t-lg h-48 md:w-48 md:rounded-none md:rounded-s-lg"
        src={imgUrl}
        alt={title}
      />
      <div className="flex flex-col justify-between h-48 p-4 leading-normal">
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
            {title}
          </h5>
          <p className="font-normal text-gray-700 ">By: {creator}</p>
        </div>

        <Link
          to={`/article/${id}`}
          onClick={onClick}
          class="flex justify-center items-center px-3 py-2 text-sm w-32 font-medium text-center text-white bg-blue-700 rounded-lg transition-all duration-300 hover:bg-blue-500"
        >
          Read more
          <RightArrow />
        </Link>
        {nameCheck === creator && (
          <button
            className="flex justify-center items-center bg-red-500 w-24 px-4 py-1 rounded-md text-white font-md"
            onClick={deleteArticle}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
