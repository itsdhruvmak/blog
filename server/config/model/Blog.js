import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    episode: { type: String },
    date: { type: String },
    thumbnail: { type: String },
    link: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
