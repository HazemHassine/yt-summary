import React, { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default function Navbar({ onSummarizeClick, onProfileClick }) {
  const { user, signOut } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  return (
    <>
      <div className="sticky top-0 z-10 h-fit bg-white bg-opacity-70 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-gray-900">Library for youtube summaries</h1>
              <p className="text-sm text-gray-600">A tool that summarizes youtube videos and saves them in a library</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onSummarizeClick}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 bg-opacity-80 rounded-md hover:bg-opacity-100 transition-colors"
              >
                Summarize
              </button>
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold hover:bg-gray-300 transition-colors"
                  >
                    {user.email[0].toUpperCase()}
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                      <button
                        onClick={() => {
                          onProfileClick()
                          setIsDropdownOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          signOut()
                          setIsDropdownOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowSignUp(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showSignUp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <SignUpForm onClose={() => setShowSignUp(false)} />
        </div>
      )}
      {showSignIn && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <SignInForm onClose={() => setShowSignIn(false)} />
        </div>
      )}
    </>
  )
}