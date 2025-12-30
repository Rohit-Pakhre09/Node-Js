import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            _id: user._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating refresh and access token");
    }
};

export { generateAccessAndRefreshTokens, generateAccessToken, generateRefreshToken };
