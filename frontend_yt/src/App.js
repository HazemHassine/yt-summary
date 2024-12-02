import React, { useState, useEffect } from 'react'
import ArticleCard from "./Card5"
import Navbar from "./Navbar"
import Footer from "./Footer"
import CustomCursor from "./CustomCursor"
import './styles/globals.css'
import SummarizeWindow from './summarizeWindow/SummarizeWindow'

export default function App() {
  const [htmlFiles, setHtmlFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summarizeWindow, setSummarizeWindow] = useState(false);
  const [reload, setReload] = useState(0);

  const handleReload = () => {
    setReload(reload + 1)
  }
  const fetchHtmlFiles = () => {
    setLoading(true); // Start loading
    fetch("db/api/html-files")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setHtmlFiles(data); // Save data to state
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false); // Stop loading even on error
      });
  };

  // ... (keep your existing useEffect code)
  useEffect(() => {
    // Fetch data from the API
    fetchHtmlFiles();
  }, [reload]); // Empty dependency array ensures this runs once on component mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleSummarizeWindow = () => {
    setSummarizeWindow(!summarizeWindow);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-teal-500 to-purple-600 animate-gradient-x cursor-none">
      <CustomCursor />
      <div className="wave-pattern"></div>
      <Navbar onSummarizeClick={toggleSummarizeWindow} />
      {summarizeWindow && <SummarizeWindow reloader={handleReload} onClose={() => setSummarizeWindow(false)} />}
      <div className="flex-grow container mx-auto px-4 py-8 relative z-0">
        <div className="flex flex-wrap justify-center gap-6">
          {htmlFiles.map((file, index) => (
            <ArticleCard key={index} articleTitle={file.fileName} link={file.link} introduction={file.introduction} title={file.title} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}



// import React, { useState, useEffect } from 'react'
// import ArticleCard from "./Card5"
// import Navbar from "./Navbar"
// import Footer from "./Footer"
// import CustomCursor from "./CustomCursor"
// import './styles/globals.css'
// import SummarizeWindow from './summarizeWindow/SummarizeWindow'
// // import { Route } from 'react-router'

// export default function App() {
//   const [htmlFiles, setHtmlFiles] = useState([]); // State to store API data
//   const [error, setError] = useState(null); // State to store errors
//   const [loading, setLoading] = useState(true); // State to show loading status
//   const [summarizeWindow, setSummarizeWindow] = useState(true);
//  // Uncomment when building!
//   // useEffect(() => {
//   //   // Fetch data from the API
//   //   fetch("/api/html-files")
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error(`HTTP error! status: ${response.status}`);
//   //       }
//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       setHtmlFiles(data); // Save data to state
//   //       setLoading(false); // Stop loading
//   //     })
//   //     .catch((err) => {
//   //       setError(err.message);
//   //       setLoading(false); // Stop loading even on error
//   //     });
//   // }, []); // Empty dependency array ensures this runs once on component mount

//   // if (loading) return <p>Loading...</p>;
//   // if (error) return <p>Error: {error}</p>;
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-teal-500 to-purple-600 animate-gradient-x cursor-none">
//       <CustomCursor />
//       <div className="wave-pattern"></div>
//       <Navbar/>
//       {summarizeWindow && <SummarizeWindow/>}
//       <div className="flex-grow container mx-auto px-4 py-8 relative z-0">
//         <div className="flex flex-wrap justify-center gap-6">
//           {htmlFiles.map((file, index) => (
//             <ArticleCard articleTitle={file.fileName} link={file.link} introduction={file.introduction} title={file.title} />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

