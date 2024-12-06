const dotenv = require('dotenv');
const Groq = require('groq-sdk'); // GROQ SDK
const he = require('he');
const markdown = require('markdown').markdown;
const { YoutubeTranscript } = require('youtube-transcript');

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

/**
 * Cleans and concatenates transcript responses into a single string.
 * @param {Array} transcripts - Array of transcript objects with `text` properties.
 * @returns {string} - The cleaned and concatenated transcript.
 */
const cleanTranscript = (transcripts) =>{
    return transcripts
        .map(transcript => he.decode(transcript.text)) // Decode HTML entities
        .join(' ') // Join with a space between texts
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .trim(); // Remove leading/trailing spaces
}



const ytProcessSummaryProcess = async (url) => {
    try {
        const videoId = youtubeUrlToId(url);
  
        if (!videoId) {
            return "Invalid YouTube URL";
        }
  
        // Fetch transcript (mocked; replace with actual YouTube API integration)
        const transcript = await YoutubeTranscript.fetchTranscript(url, {lang: "en"});
        
        // Summarize transcript
        const summary = await summarizeText([cleanTranscript(transcript)]);
  
        // Extract title from the summary
        const [title, ...rest] = summary.split("\n");
        const markdownContent = rest.join("\n");
  
        // Generate HTML content
     return {
            title: title.replaceAll("*", ""),
            url: url,
            createdAt: new Date().toISOString(),
            html: markdown.toHTML(markdownContent).replaceAll("**", "")}
    } catch (error) {
        console.error(error);
        return "Error: Internal server error"
    }
  };
ytProcessSummaryProcess("https://www.youtube.com/watch?v=g4eWVcv3gOY").then((a) => {console.log(a)})