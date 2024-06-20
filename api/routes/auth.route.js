import express from "express";
import { login , logout, register, userInfo } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/userInfo/:id", userInfo);


export default router;
