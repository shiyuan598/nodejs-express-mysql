import express, { Router } from "express";
import { getIssueList, addIssue, updateIssue, deleteIssue } from "../controller/issue.controller";
import { addReply, deleteReply} from "../controller/reply.controller"
const router: Router = express.Router();

router.get("/issue/list", getIssueList);
router.get("/issue/add", addIssue);
router.post("/issue/update", updateIssue);
router.post("/issue/delete", deleteIssue);
router.post("/reply/add", addReply);
router.post("/reply/delete", deleteReply);

export default router;
