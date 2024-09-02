import { Router } from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadFiles } from "../controller/uploadController.js";

const uploadRouter = Router();

uploadRouter.post("/upload", upload.array("files"), uploadFiles);

export default uploadRouter;
