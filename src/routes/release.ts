import express, { Router } from "express";
import { getReleaseList, getReleaseDetail } from "../controller/release.controller";
const router: Router = express.Router();

router.get("/releases", getReleaseList);
router.get("/releases/info", getReleaseDetail);

export default router;
