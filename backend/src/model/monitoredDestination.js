import mongoose, { Schema } from "mongoose";

const monitoredDestinationSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Moderate", "High", "Extreme"],
      default: "Low",
    },
  },
  {
    timestamps: true,
  }
);

export const monitorDestination = mongoose.model(
  "monitorDestination",
  monitoredDestinationSchema
);
