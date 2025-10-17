
import express from "express";
import { logout, register ,login } from "../controllers/user.controller.js";
const router = express.Router()

router.post("/signup", register)
router.post("/login", login)
router.get("/logout", logout)
export default router;

