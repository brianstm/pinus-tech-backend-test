import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const JWT_SECRET =
  process.env.JWT_SECRET || "i_love_peenoos_and_babono_and_epan";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, username, email, password } = req.body;

    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
      res.status(400).json({
        message:
          "Password must be at least 8 characters long, contain at least one capital letter and one special character.",
      });
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      res.status(400).json({ message: "Invalid email format." });
      return;
    }

    const user = new User({ name, username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Username or email already exists." });
    } else {
      res
        .status(400)
        .json({ message: "Registration failed", error: error.message });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1y",
    });

    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: "Login failed", error: error.message });
  }
};
