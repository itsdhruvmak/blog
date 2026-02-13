import jwt from 'jsonwebtoken'
import User from '../config/model/User.js'
import bcrypt from 'bcrypt'

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
        const token = req.cookies.userToken || req.cookies.adminToken;

        if (!token) {
            return res.status(200).json({ authenticated: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role === 'admin') {
            return res.status(200).json({ authenticated: true, user: { role: 'admin' } });
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(200).json({ authenticated: false });
        }

        return res.status(200).json({
            authenticated: true,
            user: user,
            message: "Authorized"
        });
    } catch (error) {
        return res.status(200).json({ authenticated: false });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields (name, email, password) are required" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" })
        }

        const newUser = await User.create({ name, email, password, role: 'user' })

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('userToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email, token }
        })
    } catch (error) {
        console.error("Register Error Details:", error);
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await User.findOne({ email, isDeleted: false })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('userToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        })

        return res.status(200).json({
            message: "Logged in successfully",
            user: { id: user._id, name: user.name, email: user.email }
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const logout = async (req, res) => {
    res.clearCookie('adminToken');
    res.clearCookie('userToken');
    return res.status(200).json({ message: "Logged out successfully" });
}
