import express from "express";
import { getBlogs, createBlog, deleteBlog } from "../controllers/blogController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/create", verifyAdmin, upload.single("thumbnail"), createBlog);
blogRouter.delete("/:id", verifyAdmin, deleteBlog);

export default blogRouter;
