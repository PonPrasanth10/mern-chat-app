import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/database.js";

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

import cookieParser from "cookie-parser";
import cors from "cors"
import { app,server } from "./lib/socket.js";
import path from "path";


dotenv.config()

const PORT=process.env.PORT;
const __dirname = path.resolve();

// Use express.json() with a custom limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(cookieParser())




app.use("/api/auth",authRoute)
app.use("/api/messages",messageRoute)


server.listen(PORT, () => {
    console.log("Server is running on Port: "+PORT)
    connectDB();
})