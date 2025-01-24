"use server";

import User from "@/models/user.model";
import Verification from "@/models/verification.model";
import connectToDb from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const CreateUserAction = async (formData: {
  name: string;
  email: string;
  password: string;
  userType: string;
}) => {
  const { name, email, password, userType } = formData;
  await connectToDb();
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      userType,
    });

    await user.save();

    if (!user) {
      return {
        success: false,
        message: "Some error occured",
      };
    }
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!);

    const getCookies = await cookies();

    getCookies.set("PlvetnUu4j", token);

    return {
      success: true,
      message: "User created successfully",
      user: JSON.parse(
        JSON.stringify({
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        })
      ),
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred",
    };
  }
};

export const LoginUserAction = async (formData: {
  email: string;
  password: string;
}) => {
  const { email } = formData;
  await connectToDb();
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return {
        success: false,
        message: "User does not exist",
      };
    }
    const isPasswordValid = bcrypt.compareSync(
      formData.password.toString(),
      userExists.password
    );
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const tokenData = {
      id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!);

    const getCookies = await cookies();

    getCookies.set("PlvetnUu4j", token);

    return {
      success: true,
      message: "User logged in successfully",
      user: JSON.parse(
        JSON.stringify({
          id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          userType: userExists.userType,
        })
      ),
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred",
    };
  }
};

export const FetchUserDataAction = async (userId: string) => {
  await connectToDb();
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    // Return only needed data to avoid cycles
    return {
      success: true,
      message: "Fetching user details...",
      userData: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        bio: user.bio || "",
        skills: user.skills || [],
        rate: {
          rateType: user.rate?.rateType || "Hourly",
          rate: user.rate?.rate || 0,
        },
        country: user.country || "Pakistan",
        province: user.province || "",
        area: user.area || "",
        profilePicture: user.profilePicture || "",
        phoneNumber: user.phoneNumber || "",
        userType: user.userType,
        isVerified: user.isVerified,
      },
    };
  } catch (error) {
    console.error("FetchUserDataAction error:", error);
    return {
      success: false,
      message: "An error occurred",
    };
  }
};

export const UpdateUserAction = async (formData: User) => {
  await connectToDb();
  try {
    const {
      id,
      name,
      bio,
      email,
      rate,
      skills,
      country,
      province,
      area,
      profilePicture,
      phoneNumber,
    } = formData;
    const userExists = await User.findById(id);
    if (!userExists) {
      return {
        success: false,
        message: "User not found",
      };
    }

    userExists.name = name;
    userExists.bio = bio;
    userExists.email = email;
    userExists.rate = rate;
    userExists.skills = skills;
    userExists.country = country;
    userExists.province = province;
    userExists.area = area;
    userExists.profilePicture = profilePicture;
    userExists.phoneNumber = phoneNumber;

    await userExists.save();

    return {
      success: true,
      message: "User updated successfully",
      userData: {
        id: userExists._id.toString(),
        name: userExists.name,
        email: userExists.email,
        bio: userExists.bio || "",
        skills: userExists.skills || [],
        rate: {
          rateType: userExists.rate?.rateType || "Hourly",
          rate: userExists.rate?.rate || 0,
        },
        country: userExists.country || "Pakistan",
        province: userExists.province || "",
        area: userExists.area || "",
        profilePicture: userExists.profilePicture || "",
        phoneNumber: userExists.phoneNumber || "",
        userType: userExists.userType,
        isVerified: userExists.isVerified,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred",
    };
  }
};

export const SubmitVerificationAction = async (formData: {
  userId: string;
  name: string;
  frontUrl: string;
  backUrl: string;
}) => {
  await connectToDb();
  try {
    const { userId, name, frontUrl, backUrl } = formData;

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (userExists.isVerified) {
      return {
        success: false,
        message: "User is already verified",
      };
    }

    // Check if a verification already exists for the user
    const existingVerification = await Verification.findOne({ userId });

    if (existingVerification) {
      if (existingVerification.status.toLowerCase() === "pending") {
        return {
          success: false,
          message:
            "A verification request is already pending. Please wait for approval.",
        };
      } else if (existingVerification.status.toLowerCase() === "approved") {
        return {
          success: false,
          message: "Your verification request has already been approved.",
        };
      } else if (existingVerification.status.toLowerCase() === "rejected") {
        return {
          success: false,
          message:
            "Your previous verification request was rejected. Please contact support.",
        };
      }
    }

    // Create a new verification request
    const newVerification = new Verification({
      userId,
      name,
      frontUrl,
      backUrl,
      status: "pending",
    });
    await newVerification.save();

    return {
      success: true,
      message:
        "Verification submitted successfully! Your account will be verified within 24 hours.",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while submitting the verification request.",
    };
  }
};
