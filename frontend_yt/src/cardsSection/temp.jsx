import React, { useState, useEffect } from 'react';
import ArticleCard from './Card5';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import './styles/globals.css';
import SummarizeWindow from './summarizeWindow/SummarizeWindow';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './Profile';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from './hooks/useAuth';
import { db } from './lib/firebase';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Default is not loading
  const [summarizeWindow, setSummarizeWindow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { currentUser } = useAuth();

  const getArticles = async (userId) => {
    try {
      setLoading(true);
      const articlesRef = collection(db, `users/${userId}/articles`);
      const querySnapshot = await getDocs(articlesRef);

      const articlesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArticles(articlesList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error.message);
      setArticles([]);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (currentUser && currentUser.uid) {
      await getArticles(currentUser.uid);
    } else {
      setArticles([]); // Clear articles when no user is signed in
      setError(null); // Reset error
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const toggleSummarizeWindow = () => {
    setSummarizeWindow(!summarizeWindow);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-teal-500 to-purple-600 animate-gradient-x cursor-none">
        <CustomCursor />
        <div className="wave-pattern"></div>
        <Navbar
          onSummarizeClick={toggleSummarizeWindow}
          onProfileClick={handleProfileClick}
        />
        {summarizeWindow && (
          <SummarizeWindow onClose={() => setSummarizeWindow(false)} />
        )}
        <div className="flex-grow container mx-auto px-4 py-8 relative z-0">
          {currentUser ? (
            showProfile ? (
              <Profile onClose={() => setShowProfile(false)} />
            ) : (
              <div className="flex flex-wrap justify-center gap-6">
                {loading ? (
                  <p>Loading articles...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : articles.length > 0 ? (
                  articles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      articleTitle={article.title}
                      url={article.url}
                      description={article.description}
                    />
                  ))
                ) : (
                  <p>No articles to display.</p>
                )}
              </div>
            )
          ) : (
            <div className="text-center">
              <h2>Welcome to the App!</h2>
              <p>Please sign in to see your articles.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
