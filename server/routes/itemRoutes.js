import express from "express"
import { createProduct, editProduct, getAllProducts, deleteProduct } from "../controllers/itemController.js"
import upload from "../config/multer.js"
import { verifyAdmin } from "../middleware/authMiddleware.js"

const itemRouter = express.Router()

itemRouter.post("/create", verifyAdmin, upload.single("image"), createProduct)
itemRouter.put("/edit/:id", verifyAdmin, upload.single("image"), editProduct)
itemRouter.delete("/delete/:id", verifyAdmin, deleteProduct)
itemRouter.get("/all", getAllProducts)

export default itemRouter