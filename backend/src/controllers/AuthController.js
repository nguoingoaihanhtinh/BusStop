import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import Order from "../models/Order.js";
import Seat from "../models/SeatModel.js";
import { Op } from "sequelize";

// Environment variables for security
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3h"; // Token expiry duration
const signToken = (UserId) => {
  return jwt.sign({ id: UserId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
const sendJsonToken = (user, statusCode, req, res) => {
    if (user.dataValues.UserId === undefined) {
      throw new Error("User ID is undefined");
    }
    const token = signToken(user.dataValues.UserId.toString());
    const expir = parseInt(process.env.JWT_COOKIE_EXPIRE_IN) || 1;
  
    const cookieOptions = {
      expires: new Date(Date.now() + expir * 24 * 60 * 60 * 1000),
      // httpOnly: true,
    };
    res.cookie("jwt", token, {
      ...cookieOptions,
    });
    res.status(statusCode).json({
      status: "success",
      token,
    });
  };
  
// Register Controller
export const register = async (req, res) => {
    const { userName, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { Email: email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      const newUser = await User.create({
        Username: userName,
        Email: email,
        Password: hashedPassword,
      });
  
      // Send JWT token and user info
      sendJsonToken(newUser, 201, req, res);
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Login Controller
export const login = async (req, res) => {
    const { Email, Password } = req.body; // Match your request body keys exactly
  
    try {
      // Find the user by email
      const user = await User.findOne({ where: { Email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if password matches
      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Send JWT token and user info
      sendJsonToken(user, 200, req, res);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  export const checkUserSession = async (req, res) => {
    try {
      // Retrieve the token from the Authorization header or cookies
      const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
  
      // Check if the user exists in the database
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Respond with user data if the token is valid
      return res.status(200).json({
        message: "Session active",
        user: {
          id: user.UserId,
          Username: user.Username,
          Email: user.Email,
        },
      });
    } catch (error) {
      console.error("Error verifying token:", error);
  
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired. Please log in again." });
      }
  
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const getUserOrders = async (req, res) => {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "No token found." });
    }
  
    try {
      // Verify token and get user ID
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findByPk(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Fetch orders for the current user
      const orders = await Order.findAll({
        where: { UserId: user.UserId },
        include: [
          {
            association: "Ticket", // Ensure this association exists in your model definitions
          }, 
          {
            model: Seat,
            as: "Seats",
            attributes: ["SeatId", "SeatNumber"], // Include seat attributes
          },
        ],
        order: [["createdAt", "DESC"]], // Order by most recent
      });
  
      res.status(200).json({
        status: "success",
        data: {
          user: {
            id: user.UserId,
            Username: user.Username,
          },
          orders,
        },
      });
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ message: "Failed to fetch user orders." });
    }
  };
  export const createOrder = async (req, res) => {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    try {
      // Verify JWT token to get user ID
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.id;
  
      // Extract order details from the request body
      const { ticketId, selectedSeats, totalPrice, address, CreatedAt } = req.body;
  
      // Validate input
      if (
        !ticketId ||
        !Array.isArray(selectedSeats) ||
        selectedSeats.length === 0 ||
        !totalPrice
      ) {
        return res.status(400).json({ message: "Invalid or incomplete order details" });
      }
  
      // Create the new order
      const newOrder = await Order.create({
        UserId: userId,
        TicketId: ticketId,
        TotalPrice: totalPrice,
        Address: address,
        CreatedAt: CreatedAt || new Date(),
      });
  
      // Insert selected seats into the Seat table
      const seatData = selectedSeats.map((seatNumber) => ({
        OrderId: newOrder.OrderId,
        SeatNumber: seatNumber,
      }));
  
      await Seat.bulkCreate(seatData);
  
      res.status(201).json({
        status: "success",
        message: "Order created successfully",
        data: newOrder,
      });
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      console.error("Error creating order:", error.message || error);
      res.status(500).json({ message: "Failed to create order", error: error.message });
    }
  };
  
  // Controller to get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params; // Get user ID from URL parameters

  try {
    // Find the user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user details
    return res.status(200).json({
      status: "success",
      data: {
        id: user.UserId,
        Username: user.Username,
        Email: user.Email,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getOrderById = async (req, res) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token found." });
  }

  try {
    // Verify token and get user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { orderId } = req.params;

    // Fetch the specific order by OrderId for the current user
    const order = await Order.findOne({
      where: { OrderId: orderId, UserId: user.UserId },
      include: [
        {
          association: "Ticket", // Ensure this association exists in your model definitions
        },
        {
          model: Seat,
          attributes: ["SeatId", "SeatNumber"], // Include seat attributes
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.UserId,
          Username: user.Username,
        },
        order,
      },
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Failed to fetch order." });
  }
};
