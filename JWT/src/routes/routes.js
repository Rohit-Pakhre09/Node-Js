import express from "express";
import { homePage, signUp, login, logout, refreshToken, getProfile } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { validate, signUpSchema, loginSchema } from "../middleware/validation.middleware.js";
import { authLimiter } from "../middleware/rateLimiter.middleware.js";

export const router = express.Router();

router.get("/", homePage);

router.post("/signup", authLimiter, validate(signUpSchema), signUp);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/refresh-token", refreshToken);

router.post("/logout", verifyJWT, logout);
router.get("/profile", verifyJWT, getProfile);