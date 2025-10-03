import mongoose from "mongoose";

const { Schema } = mongoose;

const TripSchema = new Schema(
  {
    bus: {
      type: Schema.Types.ObjectId,
      ref: "BusModel", // Assuming you already have BusModel
      required: true,
    },
    startTime: { type: String, required: true }, // HH:mm
    endTime: { type: String, required: true }, // HH:mm
  },
  { timestamps: true }
);

export default mongoose.model("TripModel", TripSchema);
