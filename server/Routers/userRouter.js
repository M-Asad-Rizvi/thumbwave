import { Router } from "express";

import { createUser } from "../controller/user/createUser.js";
import { allUser } from "../controller/user/allUser.js";
import { readUser } from "../controller/user/readUser.js";
import { deleteUser } from "../controller/user/deleteUser.js";
import { login } from "../controller/user/login.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isUserLoggedIn } from "../controller/user/isUserLoggedIn.js";
import { logout } from "../controller/user/Logout.js";
import { googleAuth } from "../controller/user/googleAuth.js";
import { refreshToken } from "../controller/user/refreshToken.js";

const userRouter = Router();

userRouter.get("/", authMiddleware, allUser);

userRouter.get("/:id", readUser);

userRouter.post("/create", createUser);

userRouter.post("/delete", authMiddleware, deleteUser);

userRouter.post("/login", login);

userRouter.post("/logged-in", authMiddleware, isUserLoggedIn);

userRouter.post("/logout", authMiddleware, logout);

userRouter.post("/google", googleAuth);

userRouter.post("/refresh", refreshToken);

export default userRouter;
