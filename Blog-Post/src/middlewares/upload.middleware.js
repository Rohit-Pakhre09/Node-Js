import { v2 as cloudinary } from 'cloudinary';
import { asyncHandler } from '../utils/asyncHandler.utils.js';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export const uploadToCloudinary = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'blog-images',
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(req.file.buffer);
        });

        req.imageUrl = result.secure_url;
        next();
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
    }
});

export { upload };
