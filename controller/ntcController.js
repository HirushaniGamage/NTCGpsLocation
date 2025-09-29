import BusRouteModel from "../models/busRouteModel.js";

// Create a new bus route
export const createBusRoute = async (req, res) => {
  try {
    const { routeName, startPoint, endPoint, stops, duration, distance } =
      req.body;

    // Check if route with same startPoint and endPoint exists
    const existingRoute = await BusRouteModel.findOne({ startPoint, endPoint });
    if (existingRoute) {
      return res.status(409).json({
        message: "Route with same start and end point already exists",
      });
    }

    const newRoute = new BusRouteModel({
      routeName,
      startPoint,
      endPoint,
      stops,
      duration,
      distance,
    });

    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all bus routes
export const getAllBusRoutes = async (req, res) => {
  try {
    const routes = await BusRouteModel.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get bus route by start and endpoints
export const getBusRouteByPoints = async (req, res) => {
  try {
    const { startPoint, endPoint } = req.query;

    if (!startPoint || !endPoint) {
      return res
        .status(400)
        .json({ message: "startPoint and endPoint are required" });
    }

    const routes = await BusRouteModel.find({
      startPoint: { $regex: `^${startPoint}$`, $options: "i" },
      endPoint: { $regex: `^${endPoint}$`, $options: "i" },
    });

    if (!routes.length) {
      return res
        .status(404)
        .json({ message: "No routes found for given start and end points" });
    }

    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update bus route
export const updateBusRouteByPoints = async (req, res) => {
  try {
    const { startPoint, endPoint } = req.params;
    const updateData = req.body;

    const updatedRoute = await BusRouteModel.findOneAndUpdate(
      {
        startPoint: { $regex: `^${startPoint}$`, $options: "i" },
        endPoint: { $regex: `^${endPoint}$`, $options: "i" },
      },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRoute) {
      return res
        .status(404)
        .json({ message: "Route not found with given start and end points" });
    }
    res.json(updatedRoute);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete bus route
export const deleteBusRouteByPoints = async (req, res) => {
  try {
    const { startPoint, endPoint } = req.params;

    const deletedRoute = await BusRouteModel.findOneAndDelete({
      startPoint: { $regex: `^${startPoint}$`, $options: "i" },
      endPoint: { $regex: `^${endPoint}$`, $options: "i" },
    });

    if (!deletedRoute) {
      return res
        .status(404)
        .json({ message: "Route not found with given start and end points" });
    }
    res.json({ message: "Bus route deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
