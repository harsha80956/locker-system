const mongoose = require("mongoose");

const LockerSchema = mongoose.Schema(
  {
    lockerId: {
      type: String,
      required: true,
      unique: true,
    },
    dimension: String,
    capacity: Number,
    status: {
      type: String,
      enum: ["available", "reserved"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Locker", LockerSchema);
