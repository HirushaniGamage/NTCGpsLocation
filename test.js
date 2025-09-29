import mongoose from "mongoose";
import dotenv from "dotenv";
import BusRouteModel from "./models/busRouteModel.js"; // Adjust path if needed

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connected for BusRoute test");

    const newRoute = new BusRouteModel({
      routeName: "Colombo to Kandy Express",
      startPoint: "Colombo",
      endPoint: "Kandy",
      stops: ["Colombo", "Pettah", "Mathale", "Kandy"],
    });

    try {
      const savedRoute = await newRoute.save();
      console.log("New BusRoute saved:", savedRoute);
    } catch (err) {
      console.error("Error saving BusRoute:", err.message);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
