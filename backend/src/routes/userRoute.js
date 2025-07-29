import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  logout,
} from "../controller/userController.js";
import express from "express";
import { verifyJwt, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.use(verifyJwt);

router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.get("/", adminOnly, getAllUsers);
router.post("/logout", logout);

export default router;
