import jwt from 'jsonwebtoken'

export const verifyAdmin = (req, res, next) => {
    try {
        const token = req.cookies.adminToken;

        if (!token) {
            return res.status(401).json({ message: "Access denied. Please login as admin." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden. Admin access required." });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired session" });
    }
}

export const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.userToken;

        if (!token) {
            return res.status(401).json({ message: "Access denied. Please login." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired session" });
    }
}
