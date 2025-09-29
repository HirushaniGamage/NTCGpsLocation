import express from "express";
import {
  createBusRoute,
  getAllBusRoutes,
  getBusRouteByPoints,
  updateBusRouteByPoints,
  deleteBusRouteByPoints,
} from "../controller/ntcController.js";

import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: NTC
 *   description: National Transport Commission (NTC) - Manage bus routes
 */

/**
 * @swagger
 * /ntc/routes:
 *   post:
 *     summary: Create a new bus route
 *     tags: [NTC]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - routeName
 *               - startPoint
 *               - endPoint
 *             properties:
 *               routeName:
 *                 type: string
 *                 example: Colombo to Kandy Express
 *               startPoint:
 *                 type: string
 *                 example: Colombo
 *               endPoint:
 *                 type: string
 *                 example: Kandy
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Colombo, Pettah, Mathale, Kandy]
 *     responses:
 *       201:
 *         description: Route created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/routes", authMiddleware, createBusRoute);

/**
 * @swagger
 * /ntc/routes:
 *   get:
 *     summary: Get all bus routes
 *     tags: [NTC]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bus routes
 *       401:
 *         description: Unauthorized
 */
router.get("/routes", authMiddleware, getAllBusRoutes);

/**
 * @swagger
 * /ntc/routes-by-points:
 *   get:
 *     summary: Get bus route by start and end points (query params)
 *     tags: [NTC]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startPoint
 *         required: true
 *         schema:
 *           type: string
 *         example: Colombo
 *       - in: query
 *         name: endPoint
 *         required: true
 *         schema:
 *           type: string
 *         example: Kandy
 *     responses:
 *       200:
 *         description: Bus route found
 *       404:
 *         description: No route found
 *       401:
 *         description: Unauthorized
 */
router.get("/routes-by-points", authMiddleware, getBusRouteByPoints);

/**
 * @swagger
 * /ntc/routes/{startPoint}/{endPoint}:
 *   put:
 *     summary: Update a bus route by start and end points
 *     tags: [NTC]
 *     security:
 *       - bearerAuth: []
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeName:
 *                 type: string
 *                 example: Updated Colombo-Kandy Route
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Colombo, Kadawatha, Mawanella, Kandy]
 *     responses:
 *       200:
 *         description: Route updated successfully
 *       404:
 *         description: Route not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/routes/:startPoint/:endPoint",
  authMiddleware,
  updateBusRouteByPoints
);

/**
 * @swagger
 * /ntc/routes/{startPoint}/{endPoint}:
 *   delete:
 *     summary: Delete a bus route by start and end points
 *     tags: [NTC]
 *     security:
 *       - bearerAuth: []
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
 *         description: Route deleted successfully
 *       404:
 *         description: Route not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/routes/:startPoint/:endPoint",
  authMiddleware,
  deleteBusRouteByPoints
);

export default router;
