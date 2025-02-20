import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { COOKIEID, ROUTES } from "./model/static";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, setCookies] = useCookies([COOKIEID])

  useEffect(() => {
    if(cookies) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.DASHBOARD} element={isAuthenticated ? <Dashboard /> : <Navigate to={ROUTES.LOGIN} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
