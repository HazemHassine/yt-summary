
// Import YoutubeTranscript library: npm install youtube-transcript
const { YoutubeTranscript } = require('youtube-transcript');


// Fetch and clean the transcript
YoutubeTranscript.fetchTranscript('https://www.youtube.com/watch?v=psaCM1j9LEM', { lang: "en" })
    .then((transcripts) => {
        const cleanedTranscript = cleanTranscript(transcripts);
        console.log(cleanedTranscript); // Output the cleaned transcript
    })
    .catch((error) => {
        console.error('Error fetching transcript:', error);
    });
