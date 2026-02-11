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
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser())

app.get("/", (res) => {
    res.send("hey i'm working")
})

app.use("/api/items", itemRouter)
app.use("/api/auth", authRouter)

connectDB().then(() => {
    app.listen(PORT, console.log(`Hey i'm woroking on PORT ${PORT}`))
})