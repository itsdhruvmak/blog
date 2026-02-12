import jwt from 'jsonwebtoken'

export const loginAdmin = async (req, res) => {
    try {
        const { password } = req.body

        if (password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        });
        return res.status(200).json({ message: "Logged in successfully" })
    } catch (error) {
        console.error("Login Error Details:", error);
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json({
            authenticated: true,
            message: "Authorized"
        });
    } catch (error) {
        return res.status(500).json({ message: "CheckAuth failed" });
    }
};
