import express from 'express';
import * as BusController from '../controllers/BusController.js';

const busRoute = express.Router();

/**
 * @swagger
 * /api/bus:
 *   get:
 *     summary: Retrieve all buses
 *     tags:
 *       - Buses
 *     responses:
 *       200:
 *         description: Successfully retrieved all buses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       BusId:
 *                         type: integer
 *                         description: Unique identifier for the bus
 *                         example: 1
 *                       Name:
 *                         type: string
 *                         description: Name of the bus
 *                         example: Sunlight Express
 *                       busType:
 *                         type: string
 *                         description: Type of the bus
 *                         example: Sleeper
 *                       seatCapacity:
 *                         type: integer
 *                         description: Number of seats available on the bus
 *                         example: 40
 *       500:
 *         description: Internal server error occurred while fetching buses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to fetch buses
 */
busRoute.route('/').get(BusController.getAllBuses);

export default busRoute;