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

import userRouter from "./routes/userRoute.js";
import monitorDestination from "./routes/monitorDestinationRoute.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/destinations", monitorDestination);

export default app;
