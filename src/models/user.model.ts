import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    userType: {
      type: String,
      required: true,
      enum: ["worker", "contractor"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },
    skills: {
      type: [String],
      default: [],
    },
    rate: {
      type: {
        rateType: {
          type: String,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
          min: 0,
        },
      },
      default: {
        rateType: "Hourly",
        rate: 0,
      },
    },
    country: {
      type: String,
      default: "Pakistan",
    },
    province: {
      type: String,
      default: "",
    },
    area: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
