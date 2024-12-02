import express from 'express';
import * as FoodTypeController from '../controllers/FoodTypeController.js';

const foodTypeRoute = express.Router();

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Retrieve all food types
 *     tags:
 *       - Food Types
 *     responses:
 *       200:
 *         description: Successfully retrieved all food types
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
 *                       TypeId:
 *                         type: integer
 *                         description: Unique identifier for the food type
 *                         example: 1
 *                       NameType:
 *                         type: string
 *                         description: Name of the food type
 *                         example: Vegetarian
 *                       ParentId:
 *                         type: integer
 *                         description: The parent category ID
 *                         example: null
 *       500:
 *         description: Internal server error occurred while fetching food types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to fetch food types
 */
foodTypeRoute.route('/category').get(FoodTypeController.getAllFoodTypes);
/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Retrieve a food type by its ID
 *     tags:
 *       - Food Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the food type to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the food type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     TypeId:
 *                       type: integer
 *                       description: Unique identifier for the food type
 *                       example: 1
 *                     NameType:
 *                       type: string
 *                       description: Name of the food type
 *                       example: Vegetarian
 *       404:
 *         description: Food type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Food type not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to fetch food type
 */
foodTypeRoute.route('/category/:id').get(FoodTypeController.getFoodTypeById);
export default foodTypeRoute;
