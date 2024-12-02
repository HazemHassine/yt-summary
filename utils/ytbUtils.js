const dotenv = require('dotenv');
const Groq = require('groq-sdk'); // GROQ SDK

dotenv.config();


// Helper function to extract YouTube video ID
const youtubeUrlToId = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
}

// Function to summarize text using GROQ API
const summarizeText = async (toSummarizeText, extraInstructions = "") => {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); // Initialize GROQ client
    const completion = await groq.chat.completions.create({
        model: "llama-3.1-70b-versatile",
        messages: [
            {
                role: "user",
                content: `in the first line without any markdown, Write the suitable name of the for this, without any other text, then in the next lines, in Structured Markdown and with clear sections, tell me (in detail) what this youtube video talk about while keeping all the important information, mention important details also! and good informations. When needed explain more where the text is lacking explanations.${extraInstructions}. text: ${toSummarizeText}`
            }
        ],
        temperature: 1.1,
        max_tokens: 4640,
        top_p: 1,
        stream: false,
        stop: null,
    });

    return completion.choices[0].message.content;
}

// HTML Template
const htmlTemplate = (title, link, createdAt, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
<style>
body {
  font-family: "Arial", sans-serif; /* Clear and modern font */
  line-height: 1.6; /* Easy to read line spacing */
  color: #333; /* Comfortable text color */
  background-color: #f9f9f9; /* Light background */
  margin: 0; /* Reset default margins */
  padding: 0;
}

/* Center and Add Margins */
.container {
  max-width: 800px; /* Keeps content at a readable width */
  margin: 2rem auto; /* Center content and add vertical spacing */
  padding: 1rem; /* Add padding inside the container */
  background: #ffffff; /* White background for content */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for focus */
}

/* Headings */
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #222; /* Slightly darker headings */
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

/* Paragraphs */
p {
  margin: 0.5rem 0; /* Space between paragraphs */
}

/* Links */
a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Code Blocks */
pre {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto; /* Handles long lines of code */
}

code {
  background: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: "Courier New", Courier, monospace; /* Monospace for code */
  font-size: 0.95em;
}

/* Lists */
ul,
ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

li {
  margin: 0.5rem 0;
}

/* Blockquote */
blockquote {
  margin: 1rem 0;
  padding: 1rem;
  background: #f1f1f1;
  border-left: 4px solid #ccc;
  font-style: italic;
  color: #555;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

th {
  background: #f2f2f2;
  font-weight: bold;
}
    </style>
    <a href="${link}">${link}</a>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    <span>${createdAt}</span>
    <div>${content}</div>
  </div>
</body>
</html>`;

module.exports = {summarizeText, youtubeUrlToId, htmlTemplate};