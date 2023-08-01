const mongoose = require("mongoose");

const lockerSchema = new mongoose.Schema({
  dimensions: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  capacity: {
    type: String,
    enum: ["small", "medium", "large"],
    required: true,
  },
  availabilityStatus: {
    type: String,
    enum: ["booked", "available"],
    default: "available",
  },
  id: { type: Number },
});

const Locker = mongoose.model("Locker", lockerSchema);
module.exports = Locker;
