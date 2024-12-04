
// Get all tickets
import { Op } from "sequelize";
import Ticket from "../models/TicketModel.js";
import Seat from "../models/SeatModel.js";
import Bus from "../models/BusModel.js";


export const getAllTickets = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      departure,
      destination,
      types, // Now receiving as a string, e.g., "VIP"
      models, // Now receiving as a string, e.g., "Volkswagen"
      priceMin,
      priceMax,
    } = req.query;
    
    const offset = (page - 1) * limit;

    // Initialize where clause for ticket filtering
    const whereClause = {};

    if (departure) {
      whereClause.departure = { [Op.like]: `%${departure}%` }; // Filter by departure
    }

    if (destination) {
      whereClause.destination = { [Op.like]: `%${destination}%` }; // Filter by destination
    }

    if (priceMin || priceMax) {
      whereClause.price = {
        ...(priceMin && { [Op.gte]: parseFloat(priceMin) }),
        ...(priceMax && { [Op.lte]: parseFloat(priceMax) }),
      }; // Filter by price range
    }

    // Initialize include clause for bus filtering
    const busWhereClause = {};

    if (types) {
      const typesArray = types.split(","); // Split comma-separated string into an array
      busWhereClause.busType = { [Op.in]: typesArray }; // Filter by bus type
    }

    if (models) {
      const modelsArray = models.split(","); // Split comma-separated string into an array
      busWhereClause.busModel = { [Op.in]: modelsArray }; // Filter by bus model
    }

    // Fetch tickets with pagination, ticket filtering, and bus filtering
    const tickets = await Ticket.findAll({
      where: whereClause,
      include: [
        {
          model: Bus,
          where: busWhereClause, // Apply filters to Bus model
          attributes: [
            "Name",
            "busType",
            "busModel",
            "seatType",
            "seatCapacity",
            "Rating",
            "NumberRating",
          ], // Select specific bus fields
        },
      ],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [["TicketId", "ASC"]],
    });

    // Count the total number of tickets after filtering
    const totalTickets = await Ticket.count({
      where: whereClause,
      include: [
        {
          model: Bus,
          where: busWhereClause,
        },
      ],
    });

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

    // Initialize where clause for bus filtering (similar to getAllTickets)
    const busWhereClause = {};

    const { types, models } = req.query; // Extract the bus types and models from query params

    if (types) {
      const typesArray = types.split(","); // Split comma-separated string into an array
      busWhereClause.busType = { [Op.in]: typesArray }; // Filter by bus type
    }

    if (models) {
      const modelsArray = models.split(","); // Split comma-separated string into an array
      busWhereClause.busModel = { [Op.in]: modelsArray }; // Filter by bus model
    }

    // Fetch the ticket by ID and include the Bus information
    const ticket = await Ticket.findOne({
      where: { TicketId: id }, // Use the correct column name for the ticket ID
      include: [
        {
          model: Bus,
          where: busWhereClause, // Apply filters to Bus model if provided
          attributes: [
            "Name",
            "busType",
            "busModel",
            "seatType",
            "seatCapacity",
            "Rating",
            "NumberRating",
          ], // Select specific bus fields
        },
        {
          model: Seat,
          attributes: ["SeatId", "SeatNumber", "Status"], // Include seat attributes
        },
      ],
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
  

