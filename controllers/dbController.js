const fs = require('fs');
const path = require('path');


const {getHtmlFilesData} = require("../utils/filesUtils");


// Define the API endpoint
module.exports.htmlFilesList =  (req, res) => {
    const directoryPath = path.join(__dirname, "..", "public"); // Replace with your actual directory
    console.log(__dirname + "zeiiiiiiiiiiii")
    const data = getHtmlFilesData(directoryPath);
    res.json(data);
};

module.exports.fileName = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname,"..",  "public", fileName);
    console.log(filePath+ "azeaze")
    // Check if the file exists and is an HTML file
    if (fs.existsSync(filePath) && path.extname(fileName).toLowerCase() === '.html') {
        res.sendFile(filePath);
    } else {
        res.status(404).send("File not found");
    }
};