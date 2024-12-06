import React from "react";
import { db } from "./lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function ArticleCard(props) {
  const handleVideoClick = () => {
    window.open(props.link, "_blank", "noopener,noreferrer");
  };

  const handleReadMore = () => {
    window.open(
      `http://localhost:4000/db/${props.articleTitle}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const deleteArticle = async () => {
    try {
      if (!props.cuserUID || !props.articleId) {
        throw new Error("User ID or Article ID is missing.");
      }

      // DELETE article from Firestore
      const articleDocRef = doc(db, "users", props.cuserUID, "articles", props.articleId);
      await deleteDoc(articleDocRef);

      console.log(`Article ${props.articleId} deleted successfully.`);
      // Optionally, you can trigger a callback to update the parent state
      if (props.onDelete) props.onDelete(props.articleId);
    } catch (error) {
      console.error("Error deleting article:", error.message);
      alert("Failed to delete article. Please try again.");
    }
  };

  return (
    <div className="max-w-md p-6 min-w-[33.3%] bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-sm transition-all duration-300 hover:bg-opacity-90">
      <div className="space-y-4">
        <div className="text-sm text-gray-700" onClick={handleVideoClick}>
          Video: {props.link}
        </div>

        <h2 className="text-xl font-semibold text-black leading-tight">
          {props.title}
        </h2>
        <p className="text-gray-700 leading-relaxed">{props.introduction}</p>

        <div className="flex justify-between items-center">
          <button
            onClick={handleReadMore}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 bg-opacity-80 rounded-md hover:bg-opacity-100 transition-colors"
          >
            READ MORE
          </button>
          <button
            onClick={deleteArticle}
            className="px-4 py-2 text-sm text-red-500 rounded-md bg-white opacity-70 cursor-pointer hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
