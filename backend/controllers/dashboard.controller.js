const Locker = require("../models/locker.model");
const Booking = require("../models/booking.model");

exports.getDashboardData = async (req, res) => {
  try {
    const totalLockers = await Locker.countDocuments({});
    const totalBookings = await Booking.countDocuments({});

    const activeBookings = await Booking.countDocuments({
      bookingDate: { $eq: new Date() },
      startTime: { $lte: new Date() },
      endTime: { $gte: new Date() },
    });

    const availableLockers = await Locker.countDocuments({
      status: "available",
    });

    res.json({ totalLockers, totalBookings, activeBookings, availableLockers });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard data." });
  }
};
