import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/database.js";

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

import cookieParser from "cookie-parser";
import cors from "cors"
import { app,server } from "./lib/socket.js";



dotenv.config()

const PORT=process.env.PORT;

// Use express.json() with a custom limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
}))
app.use(cookieParser())




app.use("/api/auth",authRoute)
app.use("/api/messages",messageRoute)


server.listen(PORT, () => {
    console.log("Server is running on Port: "+PORT)
    connectDB();
})