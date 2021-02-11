import express from "express";
import { defaultt, login, signIn, users, user } from "../controllers/auth";

const router = express.Router();

router.get("/", defaultt);
router.post("/login", login);
router.post("/signin", signIn);
router.get("/users", users);
router.get("/users/:id", user);

export default router;