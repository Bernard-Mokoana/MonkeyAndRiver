import express from "express";
import healthcheck from "../controller/healthcheckController.js";

const router = express.Router();

router.get("/", healthcheck);

export default router;
