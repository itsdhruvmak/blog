import express from "express"
import { checkAuth, loginAdmin } from "../controllers/authController.js"
import { verifyAdmin } from "../middleware/authMiddleware.js";

const authRouter = express.Router()

authRouter.post("/login", loginAdmin)
authRouter.get('/check-auth', verifyAdmin, checkAuth);

export default authRouter
