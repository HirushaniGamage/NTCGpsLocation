import LocationModel from "../models/locationModel.js";
import BusRouteModel from "../models/busRouteModel.js";
import BusModel from "../models/busModel.js";

export const saveLocation = async (req, res) => {
  try {
    const { busId, latitude, longitude, locationName, status } = req.body;
    const location = await LocationModel.findOneAndUpdate(
      { busId },
      {
        latitude,
        longitude,
        locationName,
        status,
        updatedAt: Date.now(),
      },
      { upsert: true, new: true }
    );
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchBusesByRoute = async (req, res) => {
  try {
    const { startPoint, endPoint } = req.params;

    if (!startPoint || !endPoint) {
      return res
        .status(400)
        .json({ message: "Start and end points are required" });
    }

    // 1️⃣ Find route(s) matching start & end points
    const routes = await BusRouteModel.find({
      startPoint: { $regex: startPoint, $options: "i" },
      endPoint: { $regex: endPoint, $options: "i" },
    });

    if (!routes.length) {
      return res
        .status(404)
        .json({ message: "No routes found for this start and end point" });
    }

    const routeIds = routes.map((route) => route._id);

    // 2️⃣ Find buses with these route IDs and populate route
    const buses = await BusModel.find({ route: { $in: routeIds } })
      .populate("route") // populate the route field
      .populate("user"); // optional: if you want user info

    if (!buses.length) {
      return res.status(404).json({ message: "No buses found for this route" });
    }

    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get the current location of a specific bus
 */
export const getCurrentBusLocation = async (req, res) => {
  try {
    const { busId } = req.params;

    // Find the latest location update by updatedAt field for the bus
    const location = await LocationModel.findOne({ busId })
      .sort({ updatedAt: -1 }) // Latest first
      .lean();

    if (!location) {
      return res
        .status(404)
        .json({ message: "No location found for this bus" });
    }

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
