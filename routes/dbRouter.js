const router = require('express').Router();
const { htmlFilesList, fileName } = require('../controllers/dbController');

// import controllers

router.get("/api/html-files", htmlFilesList);
router.get("/:fileName", fileName);

// Define routes
module.exports = router