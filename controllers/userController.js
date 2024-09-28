import fs from "fs";
import User from "../models/userModel.js";

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      dob,
      residentialAddress,
      permanentAddress,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      cleanupFiles(req.files);
      return res.status(400).send("User with this email already exists");
    }

    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 18) {
      cleanupFiles(req.files);
      return res.status(400).send("Minimum age should be 18 years");
    }

    if (!req.files || req.files.length < 2) {
      cleanupFiles(req.files);
      return res.status(400).send("At least 2 documents are required");
    }

    const documentList = req.files.map((file) => ({
      fileName: file.originalname,
      fileType: file.mimetype,
      filePath: file.path,
    }));

    const user = new User({
      firstName,
      lastName,
      email,
      dob,
      residentialAddress,
      permanentAddress,
      documents: documentList,
    });

    await user.save();

    res.status(201).send("Form submitted successfully!");
  } catch (error) {
    console.error(error);
    cleanupFiles(req.files);
    res.status(500).send("Server error");
  }
};

const cleanupFiles = (files) => {
  if (files && files.length > 0) {
    files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) console.error("Error deleting file:", file.path, err);
      });
    });
  }
};

export default createUser;
