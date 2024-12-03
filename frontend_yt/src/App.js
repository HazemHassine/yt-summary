import React, { useState, useEffect } from 'react';
import ArticleCard from './Card5';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import './styles/globals.css';
import SummarizeWindow from './summarizeWindow/SummarizeWindow';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './Profile';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase project configuration goes here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summarizeWindow, setSummarizeWindow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [reload, setReload] = useState(0);

  const handleReload = () => {
    setReload(reload + 1);
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const articlesCollection = collection(db, "articles"); // Replace "articles" with your collection name
      const querySnapshot = await getDocs(articlesCollection);
      const articlesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setArticles(articlesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [reload]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
        <Navbar onSummarizeClick={toggleSummarizeWindow} onProfileClick={handleProfileClick} />
        {summarizeWindow && <SummarizeWindow onClose={() => { setSummarizeWindow(false); handleReload() }} />}
        <div className="flex-grow container mx-auto px-4 py-8 relative z-0">
          {showProfile ? (
            <Profile onClose={() => setShowProfile(false)} />
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  articleTitle={article.title} // Adjust property names as needed
                  link={article.link} // Adjust property names as needed
                  introduction={article.introduction} // Adjust property names as needed
                  title={article.title} // Adjust property names as needed
                />
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}