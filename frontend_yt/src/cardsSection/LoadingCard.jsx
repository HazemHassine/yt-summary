import React from 'react';

export default function ArticleCardSkeleton() {
  return (
    <div className="max-w-md p-6 min-w-[33.3%] bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-sm">
      <div className="space-y-4 animate-pulse">
        {/* Video Link Placeholder */}
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

        {/* Title Placeholder */}
        <div className="h-6 w-1/2 bg-gray-300 rounded"></div>

        {/* Introduction Placeholder */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
        </div>

        {/* Button Placeholder */}
        <div className="h-8 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
