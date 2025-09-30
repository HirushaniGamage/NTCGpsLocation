import mongoose from "mongoose";

const { Schema } = mongoose;

const LocationSchema = new Schema(
  {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusModel",
      required: true,
      unique: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TripModel", // link to your trip
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["moving", "stopped"],
      default: "moving",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LocationModel", LocationSchema);
