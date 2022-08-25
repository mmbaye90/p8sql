const multer = require("multer");
const path = require("path");
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "attachment")
            cb(null, "../font/public/images/posts/");
        else if (file.fieldname === "avatar")
            cb(null, "../font/public/images/profilPic/");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        callback(null, name);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;