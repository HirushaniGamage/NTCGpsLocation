import express from "express";
import {
  createTrip,
  deleteAllTrips,
} from "../controller/operatorController.js";
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
router.delete("/all", deleteAllTrips);
export default router;
