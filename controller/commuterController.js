import LocationModel from "../models/locationModel.js";
import BusRouteModel from "../models/busRouteModel.js";
import TripModel from "../models/tripModel.js";

export const saveLocation = async (req, res) => {
  try {
    const { busId, tripId, latitude, longitude, locationName, status } =
      req.body;

    // 1. Validate required fields
    if (!busId || !tripId || !latitude || !longitude || !locationName) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    // 2. Check if the trip exists and belongs to the bus
    const trip = await TripModel.findOne({ _id: tripId, busId });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found for this bus" });
    }

    // 3. Optional: check if trip is active (e.g., ongoing)
    const now = new Date();
    if (trip.startTime && trip.endTime) {
      if (now < trip.startTime || now > trip.endTime) {
        return res.status(400).json({ error: "Trip is not active right now" });
      }
    }

    // 4. Save or update location
    const location = await LocationModel.findOneAndUpdate(
      { busId, tripId },
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

    // 2️⃣ Find today's date range
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // 3️⃣ Find trips for today on these routes
    const tripsToday = await TripModel.find({
      startTime: { $gte: startOfDay, $lte: endOfDay },
      routeId: { $in: routeIds },
    }).populate("busId");

    if (!tripsToday.length) {
      return res
        .status(404)
        .json({ message: "No buses with trips today on this route" });
    }

    // 4️⃣ Extract buses from trips
    const buses = tripsToday.map((trip) => trip.busId);

    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get the current location of a specific bus
 */
export const getCurrentTripLocation = async (req, res, next) => {
  try {
    const { busId } = req.params;

    // Check if bus has only one trip today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const trips = await TripModel.find({ bus: busId, date: today });
    if (!trips.length)
      return next(createError(404, "No trip found for this bus today"));

    if (trips.length > 1)
      return next(createError(400, "Multiple trips today, cannot determine"));

    // Get latest location
    const location = await LocationModel.findOne({ busId })
      .sort({ updatedAt: -1 })
      .lean();

    if (!location) return next(createError(404, "No location found"));

    res.status(200).json({
      trip: trips[0],
      location,
    });
  } catch (error) {
    next(error);
  }
};
