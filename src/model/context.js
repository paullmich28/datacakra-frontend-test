import { createContext, useContext, useState } from "react";

export const ArticleContext = createContext();

export const useArticle = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
  const [comments, setComments] = useState([{}]);
  const [category, setCategory] = useState({});
  const [creator, setCreator] = useState("");

  return (
    <ArticleContext.Provider value={{ comments, setComments, category, setCategory, creator, setCreator }}>
      {children}
    </ArticleContext.Provider>
  );
};