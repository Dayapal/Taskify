import User from "../models/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

// ✅ Zod schema for validation
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const register = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { username, email, password } = req.body || {};

    if (!email || !username || !password) {
      return res.status(400).json({ errors: ["All fields are required"] });
    }

    const validation = userSchema.safeParse({ username, email, password });

    console.log("Zod validation result:", validation);

    if (!validation.success) {
      const errorMessages = (validation.error?.issues || []).map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );

      console.log("Validation errors:", errorMessages);
      return res.status(400).json({
        errors: errorMessages.length ? errorMessages : ["Invalid input"],
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: ["User already registered"] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);

      res.status(201).json({
        message: "User registered successfully",
        newUser,
        token,
      });
    }
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "An error occurred during registration",
      error: error.message,
    });
  }
};
// Placeholder functions
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "All fileds are required" });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateTokenAndSaveInCookies(user._id, res);
    res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging user" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    // The 'authenticate' middleware adds the user to req.user
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
