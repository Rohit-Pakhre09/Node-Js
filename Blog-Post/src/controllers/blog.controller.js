import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { Blog } from "../models/blog.model.js";

const createBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;

    if ([title, description, category].some((field) => field?.trim() === "")) {
        return res.status(400).json({ message: "Title, description and category are required" });
    }

    if (!req.imageUrl) {
        return res.status(400).json({ message: "Blog image is required" });
    }

    const blog = await Blog.create({
        title,
        description,
        image: req.imageUrl || null,
        category,
        author: req.user._id,
    });

    return res.status(201).json({
        message: "Blog created successfully",
        blog,
    });
});

const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).populate("author", "name email").sort({ createdAt: -1 });

    return res.status(200).json({
        message: "Blogs fetched successfully",
        blogs,
    });
});

const getUserBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ author: req.user._id }).populate("author", "name email").sort({ createdAt: -1 });

    return res.status(200).json({
        message: "User blogs fetched successfully",
        blogs,
    });
});

const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { title, description, category } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You can only update your own blogs" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
            $set: {
                title,
                description, 
                image: req.imageUrl || req.body.image,
                category,
            },
        },
        { new: true }
    );

    return res.status(200).json({
        message: "Blog updated successfully",
        blog: updatedBlog,
    });
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You can only delete your own blogs" });
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({
        message: "Blog deleted successfully",
    });
});

export { createBlog, getAllBlogs, getUserBlogs, updateBlog, deleteBlog };
