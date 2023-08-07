const Locker = require("../models/locker.model");

exports.createLocker = async (req, res) => {
  const { lockerId, dimension, capacity } = req.body;

  try {
    const locker = new Locker({
      lockerId,
      dimension,
      capacity,
    });

    const savedLocker = await locker.save();

    res.json({ message: "Locker created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error creating locker." });
  }
};

exports.getAllLockers = async (req, res) => {
  try {
    const lockers = await Locker.find({});
    res.json(lockers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving lockers." });
  }
};

exports.updateLocker = async (req, res) => {
  try {
    const updatedLocker = await Locker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLocker);
  } catch (error) {
    res.status(500).json({ message: "Error updating locker." });
  }
};
