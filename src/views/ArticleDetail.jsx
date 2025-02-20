import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { COOKIEID } from "../model/static";
import { useArticle } from "../model/context";

const ArticleDetail = () => {
  const { id } = useParams();
  const { comments, category, creator } = useArticle();

  const [cookies] = useCookies([COOKIEID]);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log(comments)
        console.log(category)
        // console.log(creator)

        const response = await axios.get(
          `https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/articles/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.authToken}`,
            },
          }
        );

        // console.log(response.data.data);
        setArticle(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load article");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <h1>By: {creator}</h1>
      <img
        src={article.cover_image_url}
        alt={article.title}
        className="w-auto h-96 object-cover my-4"
      />
      <p className="text-gray-700">{article.description}</p>

      {comments.map((comment) => (
        <h1 key={comment.id}>{comment.content}</h1>
      ))}
      <h1>{category.name}</h1>
    </div>
  );
};

export default ArticleDetail;
