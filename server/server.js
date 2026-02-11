import 'dotenv/config'
import express from 'express'
import connectDB from './config/db.js'
import itemRouter from './routes/itemRoutes.js'
import authRouter from './routes/authRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("hey i'm working")
})

app.use("/api/items", itemRouter)
app.use("/api/auth", authRouter)

// Connect to database
connectDB()

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8080
    app.listen(PORT, () => {
        console.log(`Hey i'm working on PORT ${PORT}`)
    })
}

// Export for Vercel serverless
export default app