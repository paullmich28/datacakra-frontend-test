import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { COOKIEID } from "../../model/static";
import { Article } from "../../model/types";
import ArticleCard from "../reusable/ArticleCard";
import CustomButton from "../reusable/CustomButton";
import { useArticle } from "../../model/context";
import { BeatLoader } from "react-spinners";

const ArticleList = () => {
  const { setComments, setCategory, setCreator } = useArticle();

  const [articles, setArticles] = useState<Article[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [cookie] = useCookies([COOKIEID]);

  const fetchArticles = async (page) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/articles?populate=*&pagination[pageSize]=6&pagination[page]=${page}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.authToken}`,
          },
        }
      );

      setIsLoading(false);
      setCurrentPage(page);
      setPageCount(response.data.meta.pagination.pageCount);
      setArticles(response.data.data);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  return (
    <div>
      <h2 className="font-semibold text-4xl flex items-center justify-center py-8">
        Articles List
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <BeatLoader />
        </div>
      ) : (
        <div>
          <div className="flex justify-end px-8">
            <CustomButton
              to="/upload"
              title="Upload"
              className="bg-blue-700 text-white py-2 px-4 hover:bg-blue-500"
            />
          </div>
          <ul className="grid grid-cols-2 gap-4 px-8 mt-4">
            {articles.map((article) => (
              <li key={article.id}>
                <ArticleCard
                  id={article.documentId}
                  title={article.title}
                  imgUrl={article.cover_image_url}
                  creator={article.user.username}
                  onClick={() => {
                    setComments(article.comments);
                    setCategory(article.category);
                    setCreator(article.user.username);
                  }}
                />
              </li>
            ))}
          </ul>
          <div className="flex gap-5 items-center justify-center py-10">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  fetchArticles(page);
                }}
                className={`${
                  page === currentPage ? "bg-gray-200" : null
                } px-4 py-2 rounded-full hover:bg-gray-200 transition-all duration-300`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
