const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
    uploadCSV,
    importCSV,
} = require("../controllers/importController");

// Step 1 - Upload CSV & Preview
router.post("/upload", upload.single("file"), uploadCSV);

// Step 2 - AI Import
router.post("/import", importCSV);

module.exports = router;