"use server";

import User from "@/models/user.model";
import connectToDb from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const CreateUserAction = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = formData;
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
