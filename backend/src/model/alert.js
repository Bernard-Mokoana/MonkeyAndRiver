import mongoose, { Schema } from "mongoose";

const alertSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "resolved"],
      default: "new",
    },
    timestamps: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const alert = mongoose.model("alert", alertSchema);
