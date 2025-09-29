import mongoose from "mongoose";

const { Schema } = mongoose;

const BusRouteSchema = new Schema(
  {
    routeName: {
      type: String,
      required: true,
      unique: true,
    },
    startPoint: {
      type: String,
      required: true,
    },
    endPoint: {
      type: String,
      required: true,
    },
    stops: {
      type: [String], // Array of stop names
      default: [],
    },
    duration: {
      type: String,
      required: false, // Use required, not allowNull
    },
    distance: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BusRouteModel", BusRouteSchema);
