import React, { useEffect, useState } from "react";
import ArticleCard from "../Card5";
import LoadingCard from "./LoadingCard";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth"; // Assuming this is a custom hook for authentication
import { db } from "../lib/firebase";
import ArticleCardSkeleton from "./LoadingCard";

function CardsSection() {
  const [articlesList, setArticlesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Assuming the user object contains user info when authenticated

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        // No user is signed in
        setArticlesList([]);
        setLoading(false);
        return;
      }

      // User is signed in, fetch articles from Firestore
      const userArticlesCollection = collection(
        db,
        "users",
        user.uid, // Assuming `user.uid` is the authenticated user's ID
        "articles"
      );
      const querySnapshot = await getDocs(userArticlesCollection);
      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticlesList(articles);
      console.log(articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [user]);

  if (loading)
    return (
      <div className="mt-4 flex flex-wrap justify-center gap-6">
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </div>
    );

  if (error)
    return (
      <div className="h-full w-screen bg-red-500 flex items-center justify-center">
        Error: {error}
      </div>
    );

  if (!user)
    return (
      <div className="mt-4  h-full w-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">No user signed in.</p>
      </div>
    );

  if (articlesList.length === 0)
    return (
      <div className="mt-4  h-full w-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">No articles available.</p>
      </div>
    );

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-6">
      {articlesList.map((article) => (
        <ArticleCard
          onDelete={(deletedId) => {
            setArticlesList((prev) =>
              prev.filter((article) => article.id !== deletedId)
            );
          }}
          cuserUID={user.uid}
          articleId={article.id}
          articleTitle={article.title}
          link={"Manually set url"}
          introduction={article.description}
        />
      ))}
    </div>
  );
}

export default CardsSection;
