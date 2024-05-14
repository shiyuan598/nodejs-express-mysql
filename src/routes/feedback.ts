import express, { Router } from "express";
import { getIssueList, getIssueById, getAttachmentById, addIssue, updateIssue, deleteIssue, uploadMiddleware } from "../controller/issue.controller";
import { addReply, updateReply, getAttachmentById as getReplyAttachmentById, deleteReply } from "../controller/reply.controller";

const router: Router = express.Router();

router.get("/issues", getIssueList);
router.get("/issues/:id", getIssueById);
router.get("/issues/:id/attachment", getAttachmentById);
router.post("/issues", uploadMiddleware, addIssue);
router.put("/issues/:id", uploadMiddleware, updateIssue);
router.delete("/issues/:id", deleteIssue);
router.post("/replies", addReply);
router.put("/replies/:id", updateReply);
router.delete("/replies/:id", deleteReply);
router.get("/replies/:id/attachment", getReplyAttachmentById);

export default router;
