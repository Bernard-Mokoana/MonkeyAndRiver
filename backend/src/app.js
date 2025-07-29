import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRoutes from "./routes/userRoute.js";
import monitorDestinationRoutes from "./routes/monitorDestinationRoute.js";
import healthRoutes from "./routes/healthRoute.js";
import alertRoutes from "./routes/alertRoute.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/destinations", monitorDestinationRoutes);
app.use("/api/v1/healthcheck", healthRoutes);
app.use("/api/v1/alert", alertRoutes);

export default app;
