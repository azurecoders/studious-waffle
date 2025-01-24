import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    frontUrl: {
      type: String,
      required: true,
    },
    backUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
      enum: ["pending", "approved", "rejected"],
    },
  },
  { timestamps: true }
);

const Verification =
  mongoose.models.Verification ||
  mongoose.model("Verification", verificationSchema);
export default Verification;
