import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { CommentModel, commentSchema } from "../../model/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { COOKIEID } from "../../model/static.js";

const CommentForm = ({ articleId }) => {
  const [cookies] = useCookies([COOKIEID])
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CommentModel>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentModel) => {
    try {
      await axios.post(
        "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/comments",
        {
          data: {
            content: data.content,
            article: articleId,
          },
        }, {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`
          }
        }
      );

      console.log("Success")
    } catch (error) {
      setError("content", {
        message: error.response.data.error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-200">
        <div className="px-4 py-2 bg-gray-300 rounded-t-lg">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            {...register("content")}
            id="comment"
            className="w-full px-0 text-sm text-gray-900 bg-gray-300 border-0 focus:ring-0 placeholder-gray-700"
            placeholder="Write a comment..."
          />
          {errors.content && (
            <p className="text-red-500 text-xs italic">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Post comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
