import { Request, Response } from "express";
import Expense from "../models/Expense";
import { IExpense } from "../types/expense";

export const createExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expense: IExpense = new Expense(req.body);
    expense.date = new Date(req.body.date);
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
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenses: IExpense[] = await Expense.find().sort({ date: -1 });
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
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expense: IExpense | null = await Expense.findById(req.params.id);
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
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expense: IExpense | null = await Expense.findByIdAndUpdate(
      req.params.id,
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
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expense: IExpense | null = await Expense.findByIdAndDelete(
      req.params.id
    );
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
