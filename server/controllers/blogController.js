import Blog from "../config/model/Blog.js";
import imagekit from "../config/imageKit.js";

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const { title, episode, date, link, description } = req.body;

        if (!title || !link) {
            return res.status(400).json({ success: false, message: "Title and Link are required" });
        }

        let thumbnailURL = "";
        if (req.file) {
            try {
                const result = await imagekit.upload({
                    file: req.file.buffer,
                    fileName: req.file.originalname,
                    useUniqueFileName: true,
                    folder: "blogs"
                });
                thumbnailURL = result.url;
            } catch (uploadError) {
                console.error("Blog Thumbnail Upload Error:", uploadError);
                return res.status(500).json({ success: false, message: "Thumbnail upload failed", error: uploadError.message });
            }
        }

        const newBlog = new Blog({
            title,
            episode,
            date,
            thumbnail: thumbnailURL,
            link,
            description
        });

        await newBlog.save();
        res.status(201).json({ success: true, data: newBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
