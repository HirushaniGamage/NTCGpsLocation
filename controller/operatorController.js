import BusModel from "../models/busModel.js";

// Create a new bus
export const createBus = async (req, res) => {
  try {
    const { busName, busRegNo, route, user } = req.body;

    // Check if busRegNo already exists
    const existingBus = await BusModel.findOne({ busRegNo });
    if (existingBus) {
      return res
        .status(409)
        .json({ message: "Bus registration number already exists" });
    }

    const newBus = new BusModel({
      busName,
      busRegNo,
      route,
      user,
    });

    await newBus.save();
    res.status(201).json(newBus);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all buses
export const getAllBuses = async (req, res) => {
  try {
    const buses = await BusModel.find().populate("route").populate("user");
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get bus by ID
export const getBusById = async (req, res) => {
  try {
    const bus = await BusModel.findById(req.params.id)
      .populate("route")
      .populate("user");
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update bus by ID
export const updateBusById = async (req, res) => {
  try {
    const updatedBus = await BusModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("route")
      .populate("user");

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(updatedBus);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete bus by ID
export const deleteBusById = async (req, res) => {
  try {
    const deletedBus = await BusModel.findByIdAndDelete(req.params.id);
    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json({ message: "Bus deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get bus by registration number
export const getBusByRegNo = async (req, res) => {
  try {
    const { busRegNo } = req.params;

    const bus = await BusModel.findOne({ busRegNo })
      .populate("route")
      .populate("user");
    if (!bus) {
      return res
        .status(404)
        .json({ message: "Bus not found with this registration number" });
    }
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update bus by registration number
export const updateBusByRegNo = async (req, res) => {
  try {
    const { busRegNo } = req.params;
    const updateData = req.body;

    const updatedBus = await BusModel.findOneAndUpdate(
      { busRegNo },
      updateData,
      { new: true, runValidators: true }
    )
      .populate("route")
      .populate("user");

    if (!updatedBus) {
      return res
        .status(404)
        .json({ message: "Bus not found with this registration number" });
    }
    res.json(updatedBus);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete bus by registration number
export const deleteBusByRegNo = async (req, res) => {
  try {
    const { busRegNo } = req.params;

    const deletedBus = await BusModel.findOneAndDelete({ busRegNo });
    if (!deletedBus) {
      return res
        .status(404)
        .json({ message: "Bus not found with this registration number" });
    }
    res.json({ message: "Bus deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
