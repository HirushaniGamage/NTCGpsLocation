import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "operator", "commuter"], // Allowed roles
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("UsersModel", UserSchema);
