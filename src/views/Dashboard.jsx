import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { COOKIEID, ROUTES } from "../model/static";
import axios from "axios";
import ArticleList from "../components/dashboard/ArticleList.tsx";
import Navbar from "../components/navbar/Navbar.jsx";

const Dashboard = () => {
  const [cookies, , removeCookies] = useCookies([COOKIEID]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/users/me", {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      .then(() => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        navigate(ROUTES.HOME);
      });
  }, [cookies.authToken, navigate]);

  return (
    <div>
      <Navbar onClick={() => removeCookies(COOKIEID)}/>
      <ArticleList />
    </div>
  );
};

export default Dashboard;
