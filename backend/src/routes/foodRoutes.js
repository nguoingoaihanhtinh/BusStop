import express from 'express';
import * as FoodController from '../controllers/FoodController.js';

const foodRoute = express.Router();

/**
 * @swagger
 * /api/foods:
 *   get:
 *     summary: Retrieve food items with optional pagination and filtering by category
 *     tags:
 *       - Foods
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of food items per page (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: category
 *         in: query
 *         description: Filter food items by category (e.g., Vegetarian, Dessert)
 *         required: false
 *         schema:
 *           type: string
 *           example: Vegetarian
 *     responses:
 *       200:
 *         description: Successfully retrieved food items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available
 *                   example: 5
 *                 totalFoods:
 *                   type: integer
 *                   description: Total number of food items available
 *                   example: 50
 *                 foods:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique identifier for the food item
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Name of the food item
 *                         example: Spaghetti
 *                       category:
 *                         type: string
 *                         description: Category of the food item
 *                         example: Italian
 *                       price:
 *                         type: string
 *                         description: Price of the food item
 *                         example: $12.99
 *       404:
 *         description: No food items found matching the specified filters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: No food items found
 *       500:
 *         description: Internal server error occurred while fetching food items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to fetch food items
 */

// Route to get all food items with optional pagination and category filter
foodRoute.route('/foods').get(FoodController.getAllFoods);

/**
 * @swagger
 * /api/foods/newest:
 *   get:
 *     summary: Retrieve the newest food items
 *     tags:
 *       - Foods
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of food items per page (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved the newest food items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available
 *                   example: 5
 *                 totalFoods:
 *                   type: integer
 *                   description: Total number of food items available
 *                   example: 50
 *                 foods:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique identifier for the food item
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Name of the food item
 *                         example: Spaghetti
 *                       category:
 *                         type: string
 *                         description: Category of the food item
 *                         example: Italian
 *                       price:
 *                         type: string
 *                         description: Price of the food item
 *                         example: $12.99
 *       500:
 *         description: Internal server error occurred while fetching newest food items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to fetch newest foods
 */

// Route to get the newest food items
foodRoute.route('/foods/newest').get(FoodController.getNewestFoods);

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Retrieve a single food item by ID
 *     tags:
 *       - Foods
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Unique identifier for the food item
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the food item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique identifier for the food item
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Name of the food item
 *                   example: Spaghetti
 *                 category:
 *                   type: string
 *                   description: Category of the food item
 *                   example: Italian
 *                 price:
 *                   type: string
 *                   description: Price of the food item
 *                   example: $12.99
 *       404:
 *         description: Food item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Food item not found
 *       500:
 *         description: Internal server error occurred while fetching the food item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to fetch food item
 */

// Route to get a single food item by ID
foodRoute.route('/foods/:id').get(FoodController.getFoodById);

/**
 * @swagger
 * /api/foods:
 *   post:
 *     summary: Add a new food item
 *     tags:
 *       - Foods
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Spaghetti
 *               category:
 *                 type: string
 *                 example: Italian
 *               price:
 *                 type: string
 *                 example: $12.99
 *               description:
 *                 type: string
 *                 example: Delicious pasta with tomato sauce
 *               typeId:
 *                 type: integer
 *                 example: 1
 *               image1:
 *                 type: string
 *                 example: /images/spaghetti.jpg
 *               image2:
 *                 type: string
 *                 example: /images/spaghetti2.jpg
 *               image3:
 *                 type: string
 *                 example: /images/spaghetti3.jpg
 *               itemLeft:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Successfully added the food item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation
 *                   example: success
 *                 data:
 *                   type: object
 *                   description: The added food item
 *       500:
 *         description: Internal server error occurred while adding the food item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to add food
 */

// Route to add a new food item
foodRoute.route('/foods').post(FoodController.addFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   put:
 *     summary: Update a food item by ID
 *     tags:
 *       - Foods
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Unique identifier for the food item
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Spaghetti
 *               category:
 *                 type: string
 *                 example: Italian
 *               price:
 *                 type: string
 *                 example: $12.99
 *               description:
 *                 type: string
 *                 example: Delicious pasta with tomato sauce
 *               typeId:
 *                 type: integer
 *                 example: 1
 *               image1:
 *                 type: string
 *                 example: /images/spaghetti.jpg
 *               image2:
 *                 type: string
 *                 example: /images/spaghetti2.jpg
 *               image3:
 *                 type: string
 *                 example: /images/spaghetti3.jpg
 *               itemLeft:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Successfully updated the food item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation
 *                   example: success
 *                 data:
 *                   type: object
 *                   description: The updated food item
 *       404:
 *         description: Food item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Food item not found
 *       500:
 *         description: Internal server error occurred while updating the food item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to update food item
 */

// Route to update a food item by ID
foodRoute.route('/foods/:id').put(FoodController.updateFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   delete:
 *     summary: Delete a food item by ID
 *     tags:
 *       - Foods
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Unique identifier for the food item
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the food item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation
 *                   example: success
 *       404:
 *         description: Food item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Food item not found
 *       500:
 *         description: Internal server error occurred while deleting the food item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to delete food item
 */

// Route to delete a food item by ID
foodRoute.route('/foods/:id').delete(FoodController.deleteFood);

export default foodRoute;
