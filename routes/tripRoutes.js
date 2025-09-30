import express from "express";
import {
  createTrip,
  getTripsByBus,
  getTodayTrips,
} from "../controller/tripController.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trip
 *   description: APIs for managing bus trips
 */

/**
 * @swagger
 * /trips:
 *   post:
 *     summary: Create a new trip for a bus
 *     tags: [Trip]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busId
 *               - startTime
 *               - endTime
 *             properties:
 *               busId:
 *                 type: string
 *                 example: 68d503456e36ba974bedbb28
 *               routeId:
 *                 type: string
 *                 example: 78d503456e36ba974bedcc45
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-09-30T08:00:00Z
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-09-30T12:00:00Z
 *     responses:
 *       201:
 *         description: Trip created successfully
 *       400:
 *         description: Trip already exists for this bus today
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleware, createTrip);

/**
 * @swagger
 * /trips/bus/{busId}:
 *   get:
 *     summary: Get all trips for a specific bus
 *     tags: [Trip]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         example: 68d503456e36ba974bedbb28
 *     responses:
 *       200:
 *         description: List of trips for the bus
 *       404:
 *         description: No trips found
 *       500:
 *         description: Server error
 */
router.get("/bus/:busId", authMiddleware, getTripsByBus);

/**
 * @swagger
 * /trips/today:
 *   get:
 *     summary: Get all trips scheduled for today
 *     tags: [Trip]
 *     responses:
 *       200:
 *         description: List of today’s trips
 *       404:
 *         description: No trips scheduled today
 *       500:
 *         description: Server error
 */
router.get("/today", authMiddleware, getTodayTrips);

export default router;
