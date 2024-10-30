import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 8000;

connectDB();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to PINUS Tech's Expense Tracker API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
