import mongoose from 'mongoose';
import 'dotenv/config';
import Blog from './config/model/Blog.js';

const posts = [
    {
        title: "The Art of Descriptive Prose: Capturing the Soul of Indian Cities",
        episode: "Lecture 114",
        date: "February 5, 2026",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/23/Lothal_temple_of_the_Great_Bath.jpg", // Using placeholders/external links for seeding
        link: "https://en.wikipedia.org/wiki/Lothal",
    },
    {
        title: "The Great Indian Novel: How to Structure Multi-Generational Sagas",
        episode: "Workshop 113",
        date: "January 29, 2026",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Literature_icon.jpg",
        link: "https://en.wikipedia.org/wiki/Category:Ancient_Indian_literature",
    },
    {
        title: "Literature in the Digital Age: Bridging Sanskrit Roots with Modern Fiction",
        episode: "Keynote 112",
        date: "January 22, 2026",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/23/Lothal_temple_of_the_Great_Bath.jpg",
        link: "https://en.wikipedia.org/wiki/Lothal",
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Blog.deleteMany({});
        console.log("Cleared existing blogs");

        await Blog.insertMany(posts);
        console.log("Seeded blogs successfully");

        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
