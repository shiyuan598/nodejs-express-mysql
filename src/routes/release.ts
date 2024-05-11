import express, { Router } from "express";
import { getReleaseList, getReleaseDetail } from "../controller/release.controller";
const router: Router = express.Router();

router.get("/list", getReleaseList);
router.get("/info", getReleaseDetail);

export default router;
