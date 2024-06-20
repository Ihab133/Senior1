import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import postRoute from "./routes/post.route.js";


const app = express();

app.use(express.json());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
    console.log("Server is Running");
});