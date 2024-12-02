const cheerio = require('cheerio');
const fs = require('fs');
const express = require('express');
const path = require('path');
const cors = require("cors");
const app = express();

const PORT = 4000;

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(`Uncaught exception: ${err.stack}`);
});

// Importing routess
const ytRouter = require('./routes/ytbRouter');
const dbRouter = require('./routes/dbRouter');

app.use('/youtube', ytRouter);
app.use('/db', dbRouter);

// unhandeled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled rejection at: ${promise} reason: ${reason.stack}`);
});

app.use(express.static(path.join(__dirname, "/frontend_yt/build")));
// app.use(express.static(path.join(__dirname, "/public")));


// Catch-all handler (React app)
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend_yt/build/index.html"));
});

app.get("*", (req, res) => {
    res.status(404).send("Ta7che")
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});