import express, { Router } from "express";
import { login, logout, createUser} from "../controller/auth.controller"
const router: Router = express.Router();

router.post("/login", login);
router.post("/users", createUser);
router.post("/logout", logout);

export default router;
