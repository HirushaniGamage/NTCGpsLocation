import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UsersModel from "../models/userModel.js";

// Replace with your own secret in production
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const register = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    // Check for existing user
    const existing = await UsersModel.findOne({
      $or: [{ userName }, { email }],
    });
    if (existing) {
      return res
        .status(409)
        .json({ message: "UserName or Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new UsersModel({
      userName,
      email,
      password: hashedPassword,
      role: role || "admin", // Default role as per your schema
    });

    await newUser.save();
    return res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await UsersModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      token,
      user: { userName: user.userName, email: user.email, role: user.role },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Example of a protected route
export const getMe = async (req, res) => {
  try {
    const user = await UsersModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
