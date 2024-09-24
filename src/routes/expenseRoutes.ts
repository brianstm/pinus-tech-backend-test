import express from "express";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController";
import { auth } from "../middleware/auth";
import multer from "multer";
import { uploadToFirebase } from "../middleware/upload";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(auth);

router.post("/", upload.single("image"), uploadToFirebase, createExpense);
router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.put("/:id", upload.single("image"), uploadToFirebase, updateExpense);
router.delete("/:id", deleteExpense);

export default router;
