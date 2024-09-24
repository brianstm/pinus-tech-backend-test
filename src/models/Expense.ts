import mongoose, { Schema } from "mongoose";
import { IExpense } from "../types/expense";

const ExpenseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
