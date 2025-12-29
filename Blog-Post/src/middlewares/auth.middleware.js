import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import jwt from "jsonwebtoken";
import { generateAccessAndRefreshTokens } from "../utils/token.utils.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            const refreshToken = req.cookies?.refreshToken;

            if (!refreshToken) {
                return res.status(401).json({ message: "Unauthorized request" });
            }

            try {
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const user = await User.findById(decodedRefreshToken?._id);

                if (!user || user.refreshToken !== refreshToken) {
                    return res.status(401).json({ message: "Invalid refresh token" });
                }

                const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

                const options = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                };

                res
                    .cookie("accessToken", accessToken, options)
                    .cookie("refreshToken", newRefreshToken, options);

                req.user = await User.findById(user._id).select("-password -refreshToken");
                return next();
            } catch (refreshError) {
                return res.status(401).json({ message: "Invalid refresh token" });
            }
        }
        return res.status(401).json({ message: "Invalid access token" });
    }
});
