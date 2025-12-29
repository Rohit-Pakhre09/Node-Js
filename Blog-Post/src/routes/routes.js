import express from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, checkAuth } from "../controllers/user.controller.js";
import { createBlog, getAllBlogs, getUserBlogs, updateBlog, deleteBlog } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload, uploadToCloudinary } from "../middlewares/upload.middleware.js";

export const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/checkauth").get(verifyJWT, checkAuth);

router.route("/blogs").get(getAllBlogs);
router.route("/blogs/").post(verifyJWT, upload.single('image'), uploadToCloudinary, createBlog);
router.route("/blogs/user").get(verifyJWT, getUserBlogs);
router.route("/blogs/update/:blogId").put(verifyJWT, upload.single('image'), uploadToCloudinary, updateBlog);
router.route("/blogs/delete/:blogId").delete(verifyJWT, deleteBlog);
