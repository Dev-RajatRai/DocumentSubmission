import mongoose from "mongoose";

export const dbConnect = () => {
  const dbUrl = process.env.MONGO_URI;
  return mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
};
