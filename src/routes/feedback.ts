import express, { Router } from "express";
import { getIssueList, getIssueById, getAttachmentById, addIssue, updateIssue, deleteIssue, uploadMiddleware } from "../controller/issue.controller";
import { addReply, updateReply, getAttachmentById as getReplyAttachmentById, deleteReply, uploadMiddleware as replyUploadMiddleware } from "../controller/reply.controller";
import { authenticate } from "../controller/authenticate";

const router: Router = express.Router();

router.get("/issues", getIssueList);
router.get("/issues/:id", getIssueById);
router.get("/issues/:id/attachment", getAttachmentById);
router.post("/issues", uploadMiddleware, addIssue);
router.put("/issues/:id", authenticate, uploadMiddleware, updateIssue);
router.delete("/issues/:id", authenticate, deleteIssue);
router.post("/replies", authenticate, replyUploadMiddleware, addReply);
router.put("/replies/:id", authenticate, replyUploadMiddleware, updateReply);
router.delete("/replies/:id", authenticate, deleteReply);
router.get("/replies/:id/attachment", getReplyAttachmentById);

export default router;
