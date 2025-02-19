import express from "express"; 
import dotenv from "dotenv"
import helmet from "helmet"
import cors from "cors"
import cookieparser from "cookie-parser"
import rateLimit from "express-rate-limit"

//Route imports
import userRoutes from "./routes/userRoutes"

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.use(helmet())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cookieparser())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
});

app.use(limiter)

app.use("/api/users", userRoutes)

app.get("/", (req, res) => {
    res.send("API is running...");
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})