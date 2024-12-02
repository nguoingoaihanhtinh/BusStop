// middleware/auth.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using the secret stored in environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach the decoded data to the request object
        next();  // Pass to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
