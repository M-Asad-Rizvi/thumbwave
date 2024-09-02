import { Router } from "express";
import { createProject } from "../controller/project/createProject.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { readProject } from "../controller/project/readProject.js";
import { allProjects } from "../controller/project/allProjects.js";
import { deleteProject } from "../controller/project/deleteProject.js";
import { findAllProjects } from "../controller/project/findAllProjects.js";
import { discoverFind } from "../controller/project/discoverFind.js";

const creatorRouter = Router();

creatorRouter.post("/create", authMiddleware, createProject);

creatorRouter.post("/", authMiddleware, readProject);

creatorRouter.post("/all", authMiddleware, allProjects);

creatorRouter.post("/find-all", authMiddleware, findAllProjects);

creatorRouter.post("/delete", authMiddleware, deleteProject);

creatorRouter.post("/discover-find", discoverFind);

export default creatorRouter;
