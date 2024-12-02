
const fs = require('fs');
const markdown = require('markdown').markdown;
const path = require('path');
const {summarizeText, youtubeUrlToId, htmlTemplate} = require('../utils/ytbUtils');




// [TODO] Questionable

module.exports.ytProcess = async (req, res) => {
    const ytSummariesPath = path.join(__dirname,"..",  "public");
    
    
    // Ensure the 'public' directory exists
    if (!fs.existsSync(ytSummariesPath)) {
        fs.mkdirSync(ytSummariesPath, { recursive: true });
    }
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const videoId = youtubeUrlToId(url);
        if (!videoId) {
            return res.status(400).json({ error: "Invalid YouTube URL" });
        }

        // Fetch transcript (mocked; replace with actual YouTube API integration)
        const transcript = "Mocked transcript text for the video..."; // Replace with actual API call

        // Summarize transcript
        const summary = await summarizeText([transcript]);

        // Extract title from the summary
        const [title, ...rest] = summary.split("\n");
        const markdownContent = rest.join("\n");

        // Generate HTML content
        const htmlContent = htmlTemplate(
            title.replaceAll("*", ""),
            url,
            new Date().toISOString(),
            markdown.toHTML(markdownContent).replaceAll("**", "")
        );

        // Save HTML file
        const filePath = path.join(ytSummariesPath, `${title.replaceAll("**", "").replace(/\s+/g, "_")}.html`);
        fs.writeFileSync(filePath, htmlContent);

        return res.json({ message: "HTML file created", filePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};