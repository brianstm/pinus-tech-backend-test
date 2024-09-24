import { Document } from "mongoose";

export interface IExpense extends Document {
  title: string;
  description?: string;
  amount: number;
  date: Date;
  category: string;
  userId: string;
  imageUrl?: string;
}
