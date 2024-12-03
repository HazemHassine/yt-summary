import React, { useState } from "react";
import { CheckCheckIcon, X } from "lucide-react";

export default function SummarizeWindow({ onClose }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryFilePath, setSummaryFilePath] = useState(null);
  const [error, setError] = useState("");
  const [validUrl, setValidUrl] = useState(false);
  function isValidYouTubeUrl(url) {
    const regex =
      /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/;
    const match = url.match(regex);
  
    return match && match[1]; // Return true if video ID is captured
  }

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setError("");
    setSummaryFilePath(null);
    try {
      const response = await fetch("youtube/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: videoUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize video");
      }

      const data = await response.json();
      setSummaryFilePath("db/"+ data.filePath.split("/").pop()); // File path from server response
    } catch (err) {
      console.log(err);
      setError(
        "Failed to summarize video. Please check the URL and try again."
      );
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Summarize YouTube Video</h2>
          <button onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter YouTube video URL"
            value={videoUrl}
            onChange={(e) => {
                const url = e.target.value;
                setVideoUrl(url); // Update state first
                setValidUrl(isValidYouTubeUrl(url)); // Validate directly
              }}
              
            className="border rounded w-full px-2 py-1"
          />
          <CheckCheckIcon />
        </div>
        <div className="mb-4">
          {validUrl && (
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoUrl
                  .split("=")
                  .pop()}`}
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          )}
        </div>
        <button onClick={handleSummarize} disabled={isSummarizing}>
          {isSummarizing ? "Summarizing..." : "Summarize"}
        </button>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {summaryFilePath && (
          <div className="mb-4">
            <p className="font-semibold">Summary ready!</p>
            <a
              href={summaryFilePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Open Summary
            </a>
          </div>
        )}
      </div>
    </div>
  );
}