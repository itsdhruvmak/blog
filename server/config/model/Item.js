import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    category: { type: String, required: true, enum: ["book", "product"], lowercase: true },
    subCategory: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String }
})

const Item = mongoose.model("Item", itemSchema)

export default Item
