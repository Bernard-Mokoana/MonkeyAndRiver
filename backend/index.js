import connectDB from "./src/config/db.js";
import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8001;

try {
  connectDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error(`Server failed to run`);
}
