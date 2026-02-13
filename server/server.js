import 'dotenv/config'
import express from 'express'

const requiredEnv = ['MONGO_URI', 'ADMIN_PASSWORD', 'JWT_SECRET'];
requiredEnv.forEach(env => {
    if (!process.env[env]) {
        console.error(`CRITICAL: ${env} is missing from environment variables`);
    }
});
import connectDB from './config/db.js'
import itemRouter from './routes/itemRoutes.js'
import authRouter from './routes/authRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import blogRouter from './routes/blogRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json());

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const isVercel = origin.endsWith('.vercel.app');
        const isLocal = origin.startsWith('http://localhost');

        if (isVercel || isLocal) {
            return callback(null, true);
        } else {
            console.error("CORS Blocked Origin:", origin);
            return callback(new Error('CORS policy mismatch'), false);
        }
    },
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
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/blogs", blogRouter)

connectDB()

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8080
    app.listen(PORT, () => {
        console.log(`Hey i'm working on PORT ${PORT}`)
    })
}

app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
    });
});

export default app