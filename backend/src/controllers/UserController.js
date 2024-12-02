import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js'; // Replace with your Sequelize User model
import UserFoodSaved from '../models/UserFoodSaved.js'; // Replace with your UserFoodSaved model
import UserFoodOrders from '../models/OrderModel.js'; // Replace with your UserFoodOrders model

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

        const savedFoodIds = await UserFoodSaved.findAll({
            where: { userId: user.id },
            attributes: ['foodId'],
        });

        const cartItems = await UserFoodOrders.findAll({
            where: { userId: user.id },
            include: ['Food'], // Assuming you have a relation to the Food model
        });

        return res.json({
            message: 'success',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                address: user.address,
                avatar: user.avatar,
                savedFoods: savedFoodIds.map((item) => item.foodId),
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

// Save food for user
export const addFoodSaved = async (req, res) => {
    const { userId, foodId } = req.body;

    const existingFood = await UserFoodSaved.findOne({ where: { userId, foodId } });

    if (existingFood) {
        return res.status(409).json({ message: 'Food item already saved.' });
    }

    await UserFoodSaved.create({ userId, foodId });
    res.json({ message: 'Food item saved successfully.' });
};

// Remove saved food
export const removeFoodSaved = async (req, res) => {
    const { userId, foodId } = req.body;

    const food = await UserFoodSaved.findOne({ where: { userId, foodId } });

    if (!food) {
        return res.status(404).json({ message: 'Food item not found.' });
    }

    await food.destroy();
    res.json({ message: 'Food item removed from saved foods.' });
};

// Paginate saved food
export const getAllFoodSaved = async (req, res) => {
    const { userId, page = 1, limit = 10 } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await UserFoodSaved.findAndCountAll({
        where: { userId },
        include: ['Food'], // Include related Food model
        offset,
        limit,
    });

    res.json({
        data: rows,
        pagination: {
            currentPage: parseInt(page, 10),
            pageSize: parseInt(limit, 10),
            totalItems: count,
            totalPages: Math.ceil(count / limit),
        },
    });
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