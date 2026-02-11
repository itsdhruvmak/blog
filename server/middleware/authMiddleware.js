import jwt from 'jsonwebtoken'

export const verifyAdmin = (req, res, next) => {
    // console.log("Cookies received:", req.cookies);
    try {
        const token = req.cookies.adminToken;

        if (!token) {
            return res.status(401).json({ message: "Access denied. Please login." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired session" });
    }
}