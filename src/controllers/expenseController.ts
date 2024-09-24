import { Request, Response } from "express";
import Expense from "../models/Expense";
import { IExpense } from "../types/expense";
import { AuthRequest } from "../middleware/auth";

export const createExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const expense: IExpense = new Expense({
      ...req.body,
      userId: req.userId,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const getExpenses = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const expenses: IExpense[] = await Expense.find({
      userId: req.userId,
    }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getExpenseById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const expense: IExpense | null = await Expense.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json(expense);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const expense: IExpense | null = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json(expense);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const expense: IExpense | null = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
