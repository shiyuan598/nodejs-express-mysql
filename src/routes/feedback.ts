import express, { Router } from "express";
import { getIssueList, getIssueById, addIssue, updateIssue, deleteIssue } from "../controller/issue.controller";
import { addReply, updateReply, deleteReply } from "../controller/reply.controller";

const router: Router = express.Router();

router.get("/issues", getIssueList);
router.get("/issues/:id", getIssueById);
router.post("/issues", addIssue);
router.put("/issues/:id", updateIssue);
router.delete("/issues/:id", deleteIssue);
router.post("/replies", addReply);
router.put("/replies/:id", updateReply);
router.delete("/replies/:id", deleteReply);

export default router;
