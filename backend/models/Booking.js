const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  locker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locker",
    required: true,
  },
  bookingTime: { type: Date, default: Date.now },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  qrCode: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
