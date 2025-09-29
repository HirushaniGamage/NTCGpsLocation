import express from "express";
import {
  createBus,
  getAllBuses,
  getBusById,
  updateBusById,
  deleteBusById,
  getBusByRegNo,
  updateBusByRegNo,
  deleteBusByRegNo,
} from "../controller/operatorController.js";

import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Operator
 *   description: Manage buses by operators
 */

/**
 * @swagger
 * /operator/buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Operator]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busRegNo
 *               - route
 *             properties:
 *               busRegNo:
 *                 type: string
 *                 example: WP-NA-1234
 *               operatorName:
 *                 type: string
 *                 example: Ceylon Bus Company
 *               route:
 *                 type: string
 *                 example: Colombo - Kandy
 *               capacity:
 *                 type: number
 *                 example: 54
 *     responses:
 *       201:
 *         description: Bus created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/buses", authMiddleware, createBus);

/**
 * @swagger
 * /operator/buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Operator]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of buses
 *       401:
 *         description: Unauthorized
 */
router.get("/buses", authMiddleware, getAllBuses);

/**
 * @swagger
 * /operator/buses/{id}:
 *   get:
 *     summary: Get bus by MongoDB ID
 *     tags: [Operator]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 650fbc1234567890abcd1234
 *     responses:
 *       200:
 *         description: Bus found
 *       404:
 *         description: Bus not found
 */
router.get("/buses/:id", authMiddleware, getBusById);

/**
 * @swagger
 * /operator/buses/{id}:
 *   put:
 *     summary: Update bus by MongoDB ID
 *     tags: [Operator]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 650fbc1234567890abcd1234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               operatorName:
 *                 type: string
 *                 example: Updated Bus Company
 *               capacity:
 *                 type: number
 *                 example: 60
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       404:
 *         description: Bus not found
 */
router.put("/buses/:id", authMiddleware, updateBusById);

/**
 * @swagger
 * /operator/buses/{id}:
 *   delete:
 *     summary: Delete bus by MongoDB ID
 *     tags: [Operator]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 650fbc1234567890abcd1234
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       404:
 *         description: Bus not found
 */
router.delete("/buses/:id", authMiddleware, deleteBusById);

/**
 * @swagger
 * /operator/bus/by-regno/{busRegNo}:
 *   get:
 *     summary: Get bus by registration number
 *     tags: [Operator]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busRegNo
 *         required: true
 *         schema:
 *           type: string
 *         example: WP-NA-1234
 *     responses:
 *       200:
 *         description: Bus found
 *       404:
 *         description: Bus not found
 */
router.get("/bus/by-regno/:busRegNo", authMiddleware, getBusByRegNo);

/**
 * @swagger
 * /operator/bus/by-regno/{busRegNo}:
 *   put:
 *     summary: Update bus by registration number
 *     tags: [Operator]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busRegNo
 *         required: true
 *         schema:
 *           type: string
 *         example: WP-NA-1234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               operatorName:
 *                 type: string
 *                 example: Updated Operator
 *               capacity:
 *                 type: number
 *                 example: 60
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       404:
 *         description: Bus not found
 */
router.put("/bus/by-regno/:busRegNo", authMiddleware, updateBusByRegNo);

/**
 * @swagger
 * /operator/bus/by-regno/{busRegNo}:
 *   delete:
 *     summary: Delete bus by registration number
 *     tags: [Operator]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busRegNo
 *         required: true
 *         schema:
 *           type: string
 *         example: WP-NA-1234
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       404:
 *         description: Bus not found
 */
router.delete("/bus/by-regno/:busRegNo", authMiddleware, deleteBusByRegNo);

export default router;
