const Locker = require("../models/Locker");

// Create a new locker
exports.createLocker = async (req, res) => {
  try {
    const { dimensions, capacity } = req.body;
    const lockerCount = await Locker.countDocuments({});
    const id = lockerCount + 1;
    const locker = new Locker({ dimensions, capacity, id });
    await locker.save();
    res.status(201).json({ message: "Locker created successfully", locker });
  } catch (error) {
    res.status(500).json({ error: "Could not create locker" });
  }
};

// Read all lockers
exports.getAllLockers = async (req, res) => {
  try {
    const lockers = await Locker.find();
    res.status(200).json(lockers);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch lockers" });
  }
};

// Update a locker by ID
exports.updateLocker = async (req, res) => {
  try {
    const { id } = req.params;
    const { dimensions, capacity, availabilityStatus } = req.body;
    const locker = await Locker.findByIdAndUpdate(
      id,
      { dimensions, capacity, availabilityStatus },
      { new: true }
    );
    res.status(200).json({ message: "Locker updated successfully", locker });
  } catch (error) {
    res.status(500).json({ error: "Could not update locker" });
  }
};

// Delete a locker by ID
exports.deleteLocker = async (req, res) => {
  try {
    const { id } = req.params;
    await Locker.findByIdAndDelete(id);
    res.status(200).json({ message: "Locker deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete locker" });
  }
};
