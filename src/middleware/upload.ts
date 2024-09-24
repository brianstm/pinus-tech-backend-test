import multer from "multer";
import { bucket } from "../config/firebase";
import { Request, Response, NextFunction } from "express";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadToFirebase = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next();
  }

  const file = req.file;
  const fileName = `${Date.now()}_${file.originalname}`;

  const fileUpload = bucket.file(fileName);

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on("error", (error) => {
    console.error(error);
    next(error);
  });

  stream.on("finish", async () => {
    try {
      await fileUpload.makePublic();
      req.body.imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  stream.end(file.buffer);
};
