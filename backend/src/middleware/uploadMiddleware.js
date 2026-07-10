const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = "uploads";

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const fileName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {

    if (
        file.mimetype === "text/csv" ||
        file.originalname.endsWith(".csv")
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only CSV files are allowed"));
    }

};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
});

module.exports = upload;