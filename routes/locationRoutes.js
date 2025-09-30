import express from "express";
import {
  saveLocation,
  searchBusesByRoute,
  getCurrentTripLocation,
} from "../controller/commuterController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Commuter
 *   description: APIs for bus location tracking and search
 */

/**
 * @swagger
 * /commuter/savebuses:
 *   post:
 *     summary: Save or update a bus's current location
 *     tags: [Commuter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busId
 *               - latitude
 *               - longitude
 *             properties:
 *               busId:
 *                 type: string
 *                 example: 68d503456e36ba974bedbb28
 *               latitude:
 *                 type: number
 *                 example: 6.9271
 *               longitude:
 *                 type: number
 *                 example: 79.8612
 *               locationName:
 *                 type: string
 *                 example: Colombo Fort
 *               status:
 *                 type: string
 *                 example: Running
 *     responses:
 *       200:
 *         description: Location saved successfully
 *       500:
 *         description: Server error
 */
router.post("/savebuses", saveLocation);

/**
 * @swagger
 * /commuter/searchBusesByRoute/{startPoint}/{endPoint}:
 *   get:
 *     summary: Search buses by start and end points
 *     tags: [Commuter]
 *     parameters:
 *       - in: path
 *         name: startPoint
 *         required: true
 *         schema:
 *           type: string
 *         example: Colombo
 *       - in: path
 *         name: endPoint
 *         required: true
 *         schema:
 *           type: string
 *         example: Kandy
 *     responses:
 *       200:
 *         description: List of buses available for the given route
 *       404:
 *         description: No buses found
 *       500:
 *         description: Server error
 */
router.get("/searchBusesByRoute/:startPoint/:endPoint", searchBusesByRoute);

/**
 * @swagger
 * /commuter/location/{busId}:
 *   get:
 *     summary: Get the latest location of a specific bus
 *     tags: [Commuter]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         example: 68d503456e36ba974bedbb28
 *     responses:
 *       200:
 *         description: Latest bus location
 *       404:
 *         description: No location found
 *       500:
 *         description: Server error
 */
router.get("/location/:busId", getCurrentTripLocation);

export default router;
