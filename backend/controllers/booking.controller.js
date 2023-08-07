const Booking = require("../models/booking.model");
const Locker = require("../models/locker.model");
const QRCode = require("qrcode");

exports.createBooking = async (req, res) => {
  const { lockerId, bookingDate, startTime, endTime } = req.body;
  const userId = req.userId; // From the token

  try {
    const locker = await Locker.findOne({ lockerId });

    if (locker.status !== "available") {
      return res.status(400).json({ message: "Locker is not available." });
    }

    const qrCode = await QRCode.toDataURL(
      `${lockerId}:${startTime}:${endTime}`
    );

    const booking = new Booking({
      user: userId,
      locker: locker._id,
      bookingDate,
      startTime,
      endTime,
      qrCode,
    });

    const savedBooking = await booking.save();

    // Update locker status to 'reserved'
    locker.status = "reserved";
    await locker.save();

    res.json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking." });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("user locker");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving bookings." });
  }
};
