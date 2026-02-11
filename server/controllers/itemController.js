import imagekit from "../config/imageKit.js"
import Item from "../config/model/item.js"

export const createProduct = async (req, res) => {
    try {
        const itemDetails = req.body;

        if (!itemDetails.category || !itemDetails.subCategory || !itemDetails.name) {
            return res.status(400).json({ message: "Name, Category, and subCategory are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const existingItem = await Item.findOne({ name: itemDetails.name });
        if (existingItem) {
            return res.status(400).json({ message: "Book or product already exists" });
        }

        let imageurl = "";
        try {
            const result = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
                useUniqueFileName: true
            });
            imageurl = result.url;
        } catch (uploadError) {
            console.error("ImageKit Upload Error:", uploadError);
            return res.status(500).json({ message: "Image upload failed", error: uploadError.message });
        }

        const item = await Item.create({
            ...itemDetails,
            image: imageurl
        });

        return res.status(201).json({
            message: "Product created successfully",
            data: item
        });

    } catch (error) {
        console.error("General Controller Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const itemDetails = req.body

        const item = await Item.findById(id)

        if (!item) return res.status(404).json({ message: "Item not found" })

        if (itemDetails.name) item.name = itemDetails.name
        if (itemDetails.description) item.description = itemDetails.description
        if (itemDetails.image) item.image = itemDetails.image
        if (itemDetails.category) item.category = itemDetails.category
        if (itemDetails.subCategory) item.subCategory = itemDetails.subCategory

        await item.save()

        return res.status(200).json({ message: "Item updated successfully", data: item })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const items = await Item.find()
        return res.status(200).json({ message: "Items fetched successfully", data: items })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}