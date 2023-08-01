const Locker = require("../models/Locker");
const Booking = require("../models/Booking");
const qrcode = require("qrcode");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { _id } = req.body;
    const locker = await Locker.findById(_id);
    const data = req.body;
    const qrCodeDataUrl = await qrcode.toDataURL(JSON.stringify(data));

    if (!locker || locker.availabilityStatus === "booked") {
      return res
        .status(400)
        .json({ error: "Invalid locker or locker is already booked" });
    }

    const booking = new Booking({
      user: req.user.userId,
      locker: _id,
      qrCode: qrCodeDataUrl,
    });
    locker.availabilityStatus = "booked";

    await Promise.all([booking.save(), locker.save()]);
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ error: "Could not create booking" });
  }
};

// Read all bookings for a specific user
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId }).populate(
      "locker",
      "dimensions capacity availabilityStatus"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch bookings" });
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("locker");
    if (!booking || booking.user.toString() !== req.user.userId) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.locker.availabilityStatus = "available";
    await Promise.all([booking.locker.save(), booking.remove()]);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete booking" });
  }
};
