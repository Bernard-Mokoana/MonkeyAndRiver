import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: "string",
      enum: ["traveler", "admin"],
      default: "traveler",
      required: true,
    },
    notifyBy: {
      type: String,
      enum: ["email", "sms", "dashboard"],
      default: "email",
    },
    riskThreshold: {
      type: String,
      enum: ["Low", "Moderate", "High", "Extreme"],
      default: "Moderate",
    },

    settings: {
      emailAlerts: {
        type: Boolean,
        default: true,
      },
      notificationThreshold: { type: Number, default: 5 },
    },
  },
  {
    timestamps: true,
  }
);

export const user = mongoose.model("user", userSchema);
