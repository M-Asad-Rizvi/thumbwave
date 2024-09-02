import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addVote } from "../controller/vote/addVote.js";
import { canVote } from "../controller/vote/canVote.js";

const voteRouter = Router();

voteRouter.post("/vote", authMiddleware, addVote);
voteRouter.post("/can-vote", authMiddleware, canVote);

export default voteRouter;
