import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads")
    },

    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, ext);
        const uuid = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const validation = fileName.replace(/\s/g, "_");
        const uniqueName = validation + "_" + uuid + ext;

        cb(null, uniqueName);
    }
});

export const upload = multer({ storage });