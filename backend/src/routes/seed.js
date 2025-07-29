import express from "express";
import { alert } from "../model/alert.js";

const router = express.Router();

router.post("/alerts", async (req, res) => {
  const sampleAlerts = [
    { title: "High server load", status: "new" },
    { title: "Database connection lost", status: "read" },
    { title: "Backup completed", status: "resolved" },
  ];

  await alert.insertMany(sampleAlerts);
  return res.status(201).json({ message: "Sample alerts inserted" });
});

export default router;
