
const fs = require('fs');
const cheerio = require('cheerio');
const path = require("path")
/**
 * Extracts the title and introduction from an HTML file.
 * @param {string} filePath - The path to the HTML file.
 * @returns {Object|null} - An object containing the title and introduction or null if parsing fails.
 */
function extractHtmlData(filePath, fileName) {
    try {
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
        const $ = cheerio.load(htmlContent);

        const title = $('title').text().trim();
        const introduction = $('p').first().text().trim();
        const link = $('a').first().text().trim();

        return { title, introduction, link, fileName };
    } catch (error) {
        console.error(`Error processing file ${filePath}: ${error.message}`);
        return null;
    }
}

/**
 * Scans a directory for HTML files and extracts data from them.
 * @param {string} directoryPath - The directory to scan.
 * @returns {Array} - An array of objects with the title and introduction of each HTML file.
 */
const getHtmlFilesData = (directoryPath) => {
    const results = [];
    try {
        const files = fs.readdirSync(directoryPath);

        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);

            if (path.extname(file).toLowerCase() === '.html') {
                const fileData = extractHtmlData(filePath, file);
                if (fileData) results.push(fileData);
            }
        });
    } catch (error) {
        console.error(`Error reading directory ${directoryPath}: ${error.message}`);
    }

    return results;
};

module.exports = {getHtmlFilesData };