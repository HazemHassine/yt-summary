import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
// import CustomCursor from "./CustomCursor"
import './styles/globals.css'
import SummarizeWindow from './summarizeWindow/SummarizeWindow'
import { AuthProvider } from './contexts/AuthContext'
import Profile from './Profile'
import CardsSection from './cardsSection/CardsSection';


export default function App() {
  const [error, setError] = useState(null);
  const [summarizeWindow, setSummarizeWindow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [reload, setReload] = useState(0);

  const handleReload = () => {
    setReload(reload + 1);
  }

  if (error) return <p>Error: {error}</p>;

  const toggleSummarizeWindow = () => {
    setSummarizeWindow(!summarizeWindow);
  }

  const handleProfileClick = () => {
    setShowProfile(true);
  }

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-teal-500 to-purple-600 animate-gradient-x">
        {/* <CustomCursor /> */}
        <div className="wave-pattern"></div>
        <Navbar onSummarizeClick={toggleSummarizeWindow} onProfileClick={handleProfileClick} />
        {summarizeWindow && <SummarizeWindow onClose={() => { setSummarizeWindow(false); handleReload() }} />}
  
        {
          showProfile ? (
            <Profile onClose={() => setShowProfile(false)} />
          ) : (
            <CardsSection setShowProfile={setShowProfile} />
          )
        }
  
        {/* Ensure the footer is pushed to the bottom */}
        <div className="flex-grow" /> {/* This makes sure the main content takes up all available space */}
  
        <Footer />
      </div>
    </AuthProvider>
  );
}