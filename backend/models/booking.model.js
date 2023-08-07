const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    locker: { type: mongoose.Schema.Types.ObjectId, ref: "Locker" },
    bookingDate: Date,
    startTime: Date,
    endTime: Date,
    qrCode: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
