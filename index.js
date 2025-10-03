import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import ntcRoutes from "./routes/ntcRoutes.js";
import operatorRoutes from "./routes/operatorRoutes.js";
import commuterRoutes from "./routes/locationRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/ntc", ntcRoutes);
app.use("/api/operator", operatorRoutes);
app.use("/api/commuter", commuterRoutes);
app.use("/api/trip", tripRoutes);
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
