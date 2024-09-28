import express from "express";
import multer from "multer";
import fs from "fs";
import createUser from "../controllers/userController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const providedFilename = req.body[file.fieldname];
    if (providedFilename) {
      cb(
        null,
        `${providedFilename}-${Date.now()}${getExtension(file.mimetype)}`
      );
    } else {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  },
});

const getExtension = (mimetype) => {
  switch (mimetype) {
    case "application/pdf":
      return ".pdf";
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    default:
      return "";
  }
};

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type, only images and PDFs are allowed!"),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB
  fileFilter,
});

router.post("/submit", upload.any("documents", 10), createUser);

export default router;
