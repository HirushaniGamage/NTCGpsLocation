import mongoose from "mongoose";

const { Schema } = mongoose;

const TripSchema = new Schema(
  {
    bus: {
      type: Schema.Types.ObjectId,
      ref: "BusModel", // Assuming you already have BusModel
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true, // e.g., "08:00"
    },
    endTime: {
      type: String,
      required: true, // e.g., "12:00"
    },
  },
  { timestamps: true }
);

// Ensure only one trip per bus per day
TripSchema.index({ bus: 1, date: 1 }, { unique: true });

export default mongoose.model("TripModel", TripSchema);
