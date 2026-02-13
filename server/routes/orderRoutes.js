import express from "express";
import { placeOrder, getUserOrders, getOrderById } from "../controllers/orderController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", verifyUser, placeOrder);
orderRouter.get("/user-orders", verifyUser, getUserOrders);
orderRouter.get("/:id", verifyUser, getOrderById);

export default orderRouter;
