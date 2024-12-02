import React from 'react'

export default function Navbar({ onSummarizeClick }) {
  // const handleSummarizeButton = () => {
  //   console.log("Summarize button clicked");
  // };
  return (
    <div className="sticky top-0 z-10 h-fit bg-white bg-opacity-70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-gray-900">Library for youtube summaries</h1>
            <p className="text-sm text-gray-600">A tool that summarizes youtube videos and saves them in a library</p>
          </div>
          <div className="flex items-center space-x-2">
          <button onClick={onSummarizeClick} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 bg-opacity-80 rounded-md hover:bg-opacity-100 transition-colors">
          Summarize
          </button>
            {/* <span className="text-sm font-medium text-gray-600">Project in progress</span> */}
          </div>
        </div>
      </div>
    </div>
  )
}

