import express from 'express';
import * as UserController from '../controllers/AuthController.js';

const userRoute = express.Router();

/**
 * @swagger
 * /api/user/check-session:
 *   get:
 *     summary: Verify the user's session via JWT
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Session is active
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
userRoute.route('/check-session').get(UserController.checkUserSession);

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
 *               userName:
 *                 type: string
 *                 description: Username of the user
 *               email:
 *                 type: string
 *                 description: Email address of the new user
 *               password:
 *                 type: string
 *                 description: Password for the account
 *     responses:
 *       201:
 *         description: Registration successful, returns token
 *       400:
 *         description: Invalid input or existing email
 *       500:
 *         description: Internal server error
 */
userRoute.route('/register').post(UserController.register);

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
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
userRoute.route('/login').post(UserController.login);

/**
 * @swagger
 * /api/user/orders:
 *   get:
 *     summary: Get orders for the authenticated user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
userRoute.route('/orders').get(UserController.getUserOrders);

export default userRoute;
