import { user } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
const refreshTokenSecret = process.env.ACCESS_TOKEN_EXPIRY;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;

export const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    if (!firstName || !lastName || !email || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status.json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {}
  return res.status(500).json({ message: "Failed to create a user" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const User = await user.findOne({ email });
    if (!User) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: User._id }, accessTokenSecret, {
      expiresIn: accessTokenExpiry,
    });

    const refreshToken = jwt.sign({ userId: User._id }, refreshTokenSecret, {
      expiresIn: refreshTokenExpiry,
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", options)
      .cookie("refreshToke", options)
      .json({
        message: "User login successfully ",
        token,
        refreshToken,
        user: { id: User._id, email: User.email },
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging a user", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    await user.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToke", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error during logout", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const User = await user.findById(req.user._id).select("-password");
    return res.status(200).json({ message: "User fetched successfully", User });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetched the user", error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, password, settings } = req.body;

    const User = await user.findById(req.user._id);

    if (!User) return res.status(404).json({ message: "user not found" });

    User.firstName = req.body.firstName || User.firstName;
    User.lastName = req.body.lastName || User.lastName;
    User.email = req.body.email || User.email;
    if (req.body.password) {
      User.password = await bcrypt.hash(req.body.password, 10);
    }

    if (settings) {
      user.settings.emailAlerts =
        settings.emailAlerts !== undefined
          ? settings.emailAlerts
          : user.settings.emailAlerts;
      user.settings.notificationThreshold =
        settings.notificationThreshold !== undefined
          ? settings.notificationThreshold
          : user.settings.notificationThreshold;
    }

    const updated = await user.save();

    return res
      .status(200)
      .json({ message: "user updated successfully", updated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update the user", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = user.find().select("-password");
    return res.status(200).json({ message: "Users fetch successfully", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};
