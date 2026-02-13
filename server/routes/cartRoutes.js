import express from "express";
import { addToCart, updateCartQuantity, removeFromCart, getCart, clearCart } from "../controllers/cartController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", verifyUser, addToCart);
cartRouter.post("/update", verifyUser, updateCartQuantity);
cartRouter.post("/remove", verifyUser, removeFromCart);
cartRouter.get("/get", verifyUser, getCart);
cartRouter.post("/clear", verifyUser, clearCart);

export default cartRouter;
