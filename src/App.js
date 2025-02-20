import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { COOKIEID, ROUTES } from "./model/static";
import { useCookies } from "react-cookie";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import ArticleDetail from "./views/ArticleDetail";
import { ArticleContext, ArticleProvider } from "./model/context";

function App() {
  const [cookies] = useCookies([COOKIEID]);

  return (
    <ArticleProvider>
      <div className="overflow-x-hidden">
        <BrowserRouter>
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={
                cookies.authToken ? (
                  <Navigate to={ROUTES.DASHBOARD} />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path={ROUTES.LOGIN}
              element={
                cookies.authToken ? (
                  <Navigate to={ROUTES.DASHBOARD} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path={ROUTES.REGISTER}
              element={
                cookies.authToken ? (
                  <Navigate to={ROUTES.DASHBOARD} />
                ) : (
                  <Register />
                )
              }
            />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                cookies.authToken ? (
                  <Dashboard />
                ) : (
                  <Navigate to={ROUTES.LOGIN} />
                )
              }
            />
            <Route
              path="/article/:id"
              element={
                cookies.authToken ? (
                  <ArticleDetail />
                ) : (
                  <Navigate to={ROUTES.LOGIN} />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ArticleProvider>
  );
}

export default App;
