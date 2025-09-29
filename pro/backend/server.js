import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import {notFound, errorHandler} from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
})