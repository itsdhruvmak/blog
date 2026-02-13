import express from "express"
import { checkAuth, loginAdmin, registerUser, loginUser, logout } from "../controllers/authController.js"
import { verifyAdmin, verifyUser } from "../middleware/authMiddleware.js";

const authRouter = express.Router()

authRouter.post("/admin/login", loginAdmin)
authRouter.get('/admin/check-auth', checkAuth);

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/logout", logout)
authRouter.get('/user/check-auth', checkAuth);

export default authRouter

