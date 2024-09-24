import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import expenseRoutes from "./routes/expenseRoutes";

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
