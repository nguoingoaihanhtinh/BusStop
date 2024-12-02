import express from 'express';
import * as UserController from '../controllers/UserController.js';

const userRoute = express.Router();

/**
 * @swagger
 * /api/user/checkjwt:
 *   get:
 *     summary: Check JWT and retrieve user details
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: User ID
 *                     username:
 *                       type: string
 *                       description: Username
 *                     email:
 *                       type: string
 *                       description: User email
 *                     address:
 *                       type: string
 *                       description: User address
 *                     avatar:
 *                       type: string
 *                       description: Avatar URL
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
userRoute.route('/').get(UserController.checkJwt);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Invalid input, such as mismatched passwords or existing email
 *       500:
 *         description: Internal server error
 */
userRoute.route('/register').post(UserController.registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login an existing user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
userRoute.route('/login').post(UserController.loginUser);

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout the current user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
userRoute.route('/logout').post(UserController.logoutUser);

/**
 * @swagger
 * /api/user/saved-food:
 *   post:
 *     summary: Save a food item for the user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               foodId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Food item saved successfully
 *       409:
 *         description: Food item already saved
 *       500:
 *         description: Internal server error
 */
userRoute.route('/saved-food').post(UserController.addFoodSaved);

/**
 * @swagger
 * /api/user/saved-food:
 *   delete:
 *     summary: Remove a saved food item for the user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               foodId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Food item removed from saved foods
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Internal server error
 */
userRoute.route('/saved-food').delete(UserController.removeFoodSaved);

/**
 * @swagger
 * /api/user/saved-foods:
 *   get:
 *     summary: Retrieve all saved food items for a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved saved foods with pagination
 *       400:
 *         description: User ID is missing
 *       500:
 *         description: Internal server error
 */
userRoute.route('/saved-foods').get(UserController.getAllFoodSaved);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Update user details
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRoute.route('/update').put(UserController.updateUser);

export default userRoute;
