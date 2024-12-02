import React from 'react'

export default function ArticleCard(props) {
    const handleVideoClick = () => {
        window.open(props.link, "_blank", "noopener,noreferrer");
      };
  const handleReadMore = () => {
    // console.log("localhost:4000/".concat(props.articleTitle));
    window.open(`http://localhost:4000/db/${props.articleTitle}`, "_blank", "noopener,noreferrer");
  };
      // fileName
  return (
    <div className="max-w-md p-6 min-w-[33.3%] bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-sm transition-all duration-300 hover:bg-opacity-90">
      <div className="space-y-4">
        <div className="text-sm text-gray-700" onClick={handleVideoClick}>Video: {props.link}</div>
        
        <h2 className="text-xl font-semibold text-black leading-tight">
          {props.title}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {props.introduction}
        </p>
        
        <button onClick={handleReadMore} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 bg-opacity-80 rounded-md hover:bg-opacity-100 transition-colors">
          READ MORE
        </button>
      </div>
    </div>
  )
}