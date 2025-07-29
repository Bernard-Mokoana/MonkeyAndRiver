import express from "express";
import { getAlert } from "../controller/alertController.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyJwt, getAlert);

export default router;
