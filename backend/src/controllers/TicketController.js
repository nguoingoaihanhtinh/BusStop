
// Get all tickets
import { Op } from "sequelize";
import Ticket from "../models/TicketModel.js";
import Seat from "../models/SeatModel.js";
// Get all tickets with optional filtering by departure and destination
export const getAllTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10, departure, destination } = req.query;
    const offset = (page - 1) * limit;

    // Initialize where clause for filtering
    const whereClause = {};

    if (departure) {
      whereClause.departure = { [Op.like]: `%${departure}%` }; // Filter tickets by departure
    }

    if (destination) {
      whereClause.destination = { [Op.like]: `%${destination}%` }; // Filter tickets by destination
    }

    // Fetch tickets with pagination and filtering
    const tickets = await Ticket.findAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [["TicketId", "ASC"]],
    });

    // Count the total number of tickets after filtering
    const totalTickets = await Ticket.count({ where: whereClause });
    const totalPages = Math.ceil(totalTickets / limit);

    // Return tickets along with pagination data
    res.json({
      status: "success",
      data: tickets,
      pagination: {
        currentPage: parseInt(page, 10),
        pageSize: parseInt(limit, 10),
        totalTickets,
        totalPages,
      },
    });
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

  
// Get the newest tickets
export const getNewestTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const tickets = await Ticket.findAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [["TicketId", "DESC"]],
    });

    const totalTickets = await Ticket.count();
    const totalPages = Math.ceil(totalTickets / limit);

    res.json({
      status: "success",
      data: tickets,
      pagination: {
        currentPage: parseInt(page, 10),
        pageSize: limit,
        totalTickets,
        totalPages,
      },
    });
  } catch (err) {
    console.error("Error fetching newest tickets:", err);
    res.status(500).json({ error: "Failed to fetch newest tickets" });
  }
};

// Get a single ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params; // Use req.params to get the ticket ID

    if (!id) {
      return res.status(400).json({ error: "Ticket ID is required" });
    }

    const ticket = await Ticket.findOne({
      where: { TicketId: id }, // Use the correct column name for the ticket ID
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({ status: "success", data: ticket });
  } catch (err) {
    console.error("Error fetching ticket:", err);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};



export const getSeatByTicketId = async (req, res) => {
    try {
      const { ticketId } = req.params;
      if (!ticketId) {
        return res.status(400).json({ error: "Ticket ID is required" });
      }
      const seats = await Seat.findAll({ where: { TicketId: ticketId } });
      if (!seats.length) {
        return res.status(404).json({ error: "No seats found for this ticket" });
      }
      res.status(200).json({ status: "success", data: seats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

