import BusModel from "../models/busModel.js";
import TripModel from "../models/tripModel.js";
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
      .populate("user")
      .populate("trips");
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
      .populate("user")
      .populate("trips");
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

export const createTrip = async (req, res, next) => {
  try {
    const { busId, startTime, endTime } = req.body;

    if (!busId || !startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "busId, startTime, and endTime are required" });
    }

    const bus = await BusModel.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return res
        .status(400)
        .json({ message: "Time must be in hh:mm AM/PM format" });
    }

    if (startTime >= endTime) {
      return res
        .status(400)
        .json({ message: "endTime must be after startTime" });
    }

    const duplicateTrip = await TripModel.findOne({
      bus: busId,
      startTime,
      endTime,
    });
    if (duplicateTrip)
      return res
        .status(400)
        .json({ message: "Trip with same start and end time already exists" });

    const trip = new TripModel({ bus: busId, startTime, endTime });
    await trip.save();

    bus.trips.push(trip._id);
    await bus.save();

    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

export const deleteAllTrips = async (req, res, next) => {
  try {
    const result = await TripModel.deleteMany({});
    // Optional: clear trips array from all buses
    await BusModel.updateMany({}, { $set: { trips: [] } });

    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} trips successfully` });
  } catch (error) {
    next(error);
  }
};
