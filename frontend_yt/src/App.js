import React, { useState, useEffect } from 'react'
import ArticleCard from "./Card5"
import Navbar from "./Navbar"
import Footer from "./Footer"
import CustomCursor from "./CustomCursor"
import './styles/globals.css'
import SummarizeWindow from './summarizeWindow/SummarizeWindow'
import { AuthProvider } from './contexts/AuthContext'
import Profile from './Profile'

export default function App() {
  const [htmlFiles, setHtmlFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summarizeWindow, setSummarizeWindow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [reload, setReload] = useState(0);

  const handleReload = () => {
    setReload(reload + 1);
  }

  const fetchHtmlFiles = () => {
    setLoading(true);
    fetch("db/api/html-files")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setHtmlFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHtmlFiles();
  }, [reload]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleSummarizeWindow = () => {
    setSummarizeWindow(!summarizeWindow);
  }

  const handleProfileClick = () => {
    setShowProfile(true);
  }

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-teal-500 to-purple-600 animate-gradient-x cursor-none">
        <CustomCursor />
        <div className="wave-pattern"></div>
        <Navbar onSummarizeClick={toggleSummarizeWindow} onProfileClick={handleProfileClick} />
        {summarizeWindow && <SummarizeWindow onClose={() => {setSummarizeWindow(false); handleReload()}} />}
        <div className="flex-grow container mx-auto px-4 py-8 relative z-0">
          {showProfile ? (
            <Profile onClose={() => setShowProfile(false)} />
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {htmlFiles.map((file, index) => (
                <ArticleCard key={index} articleTitle={file.fileName} link={file.link} introduction={file.introduction} title={file.title} />
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </AuthProvider>
  )
}