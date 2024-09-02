import express from "express";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./config/db.js";
import userRouter from "./Routers/userRouter.js";
import projectRouter from "./Routers/projectRouter.js";
import uploadRouter from "./Routers/uploadRouter.js";
import voteRouter from "./Routers/voteRouter.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.use("/api/v1/", uploadRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/vote", voteRouter);

app.listen(3000, () => {
   db();
});
