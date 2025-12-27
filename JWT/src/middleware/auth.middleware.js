import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid access token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in verifyJWT middleware: ", error.message);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid access token" });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};
