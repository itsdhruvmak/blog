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
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
const allowedOrigins = [
    process.env.CLIENT_URL,
    'https://blog-eight-rouge-21.vercel.app',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
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

// Connect to database
connectDB()

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8080
    app.listen(PORT, () => {
        console.log(`Hey i'm working on PORT ${PORT}`)
    })
}

// Global error handler
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
    });
});

// Export for Vercel serverless
export default app