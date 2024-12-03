import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js'; // Replace with your Sequelize User model

import Order from '../models/Order.js';

// Helper to generate JWT
const generateJwtToken = (user, secret, expiresIn = '1d') => {
    return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn });
};

// Helper to set JWT cookie
const setJwtCookie = (res, token) => {
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, // Set to true in production
        sameSite: 'None', // Adjust for your setup
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
};

// Check JWT
export const checkJwt = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: 'No token found.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) return res.status(404).json({ message: 'User not found.' });

        const cartItems = await Order.findAll({
            where: { userId: user.id },
            include: ['Ticket'], 
        });

        return res.json({
            message: 'success',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                address: user.address,
                avatar: user.avatar,
                cart: cartItems,
            },
        });
    } catch (err) {
        return res.status(401).json({ message: `Token validation failed: ${err.message}` });
    }
};

// Register user
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        avatar: 'https://shopcartimg2.blob.core.windows.net/shopcartctn/avatar3d.jpg',
        address: '',
    });

    const token = generateJwtToken(user, process.env.JWT_SECRET);
    setJwtCookie(res, token);

    res.json({ message: 'Registration successful.' });
};

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = generateJwtToken(user, process.env.JWT_SECRET);
    setJwtCookie(res, token);

    res.json({ message: 'Login successful.' });
};

// Logout user
export const logoutUser = (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
    res.json({ message: 'Logged out successfully.' });
};



// Update user
export const updateUser = async (req, res) => {
    const { id, username, email, address, avatar } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.address = address || user.address;
    user.avatar = avatar || user.avatar;

    await user.save();
    res.json({ message: 'User updated successfully.' });
};
// Get orders of the current user
export const getUserOrders = async (req, res) => {
    try {
      // Extract the token
      const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token found." });
      }
  
      // Verify the token and get user ID
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findByPk(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Fetch orders with associated Ticket and Seats for the current user
      const orders = await Order.findAll({
        where: { UserId: user.UserId },
        include: [
          {
            model: Ticket, // Ensure the 'Ticket' model association is set up correctly
            include: [
              {
                model: Seat, // Ensure the 'Seat' model association is set up correctly
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
  
      return res.status(200).json({
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
      return res.status(500).json({ message: "Failed to fetch user orders." });
    }
  };
  
  
