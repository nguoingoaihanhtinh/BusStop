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
/**
 * @swagger
 * /api/user/orders/create-order:
 *   post:
 *     summary: Create a new order for the authenticated user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: integer
 *                 description: ID of the ticket
 *               selectedSeats:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of selected seats
 *               totalPrice:
 *                 type: number
 *                 format: float
 *                 description: Total price for the order
 *               address:
 *                 type: string
 *                 description: Pickup address for the order
 *               CreatedAt:
 *                 type: string
 *                 format: date
 *                 description: Date the order was created
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Incomplete order details
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */

userRoute.route('/orders/create-order').post(UserController.createOrder);
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRoute.route('/:id').get(UserController.getUserById);
/**
 * @swagger
 * /api/user/orders/{orderId}:
 *   get:
 *     summary: Get a specific order by ID for the authenticated user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order retrieved successfully
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         Username:
 *                           type: string
 *                     order:
 *                       type: object
 *                       description: The order details
 *       401:
 *         description: Unauthorized, token is invalid or missing
*/
userRoute.route('/orders/:orderId').get(UserController.getOrderById);

export default userRoute;
