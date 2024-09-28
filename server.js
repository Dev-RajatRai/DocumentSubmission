import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./connection/config.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

dbConnect();

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
