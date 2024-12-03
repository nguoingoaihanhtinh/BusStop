import express from 'express';
import * as TicketController from '../controllers/TicketController.js';

const ticketRoute = express.Router();

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets with optional filters for departure and destination
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page (default is 10)
 *       - in: query
 *         name: departure
 *         schema:
 *           type: string
 *         description: Departure location filter
 *       - in: query
 *         name: destination
 *         schema:
 *           type: string
 *         description: Destination location filter
 *     responses:
 *       200:
 *         description: Successfully retrieved tickets with pagination
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
 *                       TicketId:
 *                         type: integer
 *                       Departure:
 *                         type: string
 *                       Destination:
 *                         type: string
 *                       TicketType:
 *                         type: object
 *                         properties:
 *                           NameType:
 *                             type: string
 *       500:
 *         description: Internal server error
 */
ticketRoute.route('/').get(TicketController.getAllTickets);

/**
 * @swagger
 * /api/tickets/newest:
 *   get:
 *     summary: Get the newest tickets
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page (default is 10)
 *     responses:
 *       200:
 *         description: Successfully retrieved newest tickets with pagination
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
 *                       TicketId:
 *                         type: integer
 *                       Departure:
 *                         type: string
 *                       Destination:
 *                         type: string
 *                       TicketType:
 *                         type: object
 *                         properties:
 *                           NameType:
 *                             type: string
 *       500:
 *         description: Internal server error
 */
ticketRoute.route('/newest').get(TicketController.getNewestTickets);

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Successfully retrieved ticket details
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
 *                     TicketId:
 *                       type: integer
 *                     Departure:
 *                       type: string
 *                     Destination:
 *                       type: string
 *                     TicketType:
 *                       type: object
 *                       properties:
 *                         NameType:
 *                           type: string
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal server error
 */
ticketRoute.route('/:id').get(TicketController.getTicketById);

/**
 * @swagger
 * /api/tickets/{ticketId}/seats:
 *   get:
 *     summary: Retrieve all seats for a specific ticket
 *     tags:
 *       - Seats
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the ticket to fetch seats for
 *     responses:
 *       200:
 *         description: Successfully retrieved all seats for the ticket
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
 *                       SeatId:
 *                         type: integer
 *                         description: Unique identifier for the seat
 *                         example: 1
 *                       TicketId:
 *                         type: integer
 *                         description: The ID of the ticket this seat belongs to
 *                         example: 1
 *                       SeatNumber:
 *                         type: string
 *                         description: The seat number (e.g., A1, B2)
 *                         example: "A1"
 *                       Status:
 *                         type: string
 *                         description: The status of the seat
 *                         enum:
 *                           - available
 *                           - reserved
 *                           - occupied
 *                         example: available
 *       400:
 *         description: Ticket ID not provided or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Ticket ID is required
 *       404:
 *         description: No seats found for the provided ticket ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: No seats found for this ticket
 *       500:
 *         description: Internal server error occurred while fetching seats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to fetch seats
 */
ticketRoute.route('/:ticketId/seats').get(TicketController.getSeatByTicketId);

export default ticketRoute;
