import express, { Router } from "express";
import { login, logout, getUsers, createUser, deleteUser, resetPassword, forgetPassword } from "../controller/auth.controller";
import { authenticate } from "../controller/authenticate";
const router: Router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", authenticate, deleteUser);
router.put("/users", authenticate, resetPassword);
router.put("/forget", forgetPassword);

export default router;
