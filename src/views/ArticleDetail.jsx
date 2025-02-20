import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { COOKIEID } from "../model/static";
import { useArticle } from "../model/context";
import CommentBox from "../components/reusable/CommentBox";
import CommentForm from "../components/reusable/CommentForm.tsx";

const ArticleDetail = () => {
  const { id } = useParams();
  const { comments, category, creator } = useArticle();

  const [cookies] = useCookies([COOKIEID]);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onCommentSubmitted = async () => {

  }

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log(comments);
        console.log(category);
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
    <div className="py-8 px-8 md:px-48">
      <h1 className="text-4xl font-bold text-center">{article.title}</h1>
      <div className="flex flex-col">
        <h1>By: {creator}</h1>
        {category?.name && (
          <h1>Category: {category.name}</h1>
        )}
      </div>
      <img
        src={article.cover_image_url}
        alt={article.title}
        className="w-auto h-96 object-cover my-4 mx-auto"
      />
      <p className="text-gray-700 mb-5">{article.description}</p>

      <h1 className="text-xl font-semibold">Comments</h1>
      <hr />
      
      <CommentForm articleId={article.id}/>

      <hr />

      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentBox comment={comment.content} />
        </div>
      ))}
    </div>
  );
};

export default ArticleDetail;
