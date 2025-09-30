import mongoose from "mongoose";

const { Schema } = mongoose;

const BusSchema = new Schema(
  {
    busName: {
      type: String,
      required: true,
    },
    busRegNo: {
      type: String,
      required: true,
      unique: true,
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusRouteModel", // Reference to BusRoute schema
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersModel", // Reference to User schema
      required: true,
    },
    trips: [
      {
        type: Schema.Types.ObjectId,
        ref: "TripModel",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("BusModel", BusSchema);
