import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../services/sendMail.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError("All fields are required!");
    }

    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(409, "This email user already exist!");
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    const userData = {
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpires
    };

    const newUser = await User.create(userData);
    await sendMail({
        to: newUser.email,
        subject: "OTP Verification",
        html: `<p>Your OTP for verification is: <strong>${otp}</strong></p>`
    });
    res.json(new ApiResponse(201, newUser, "User created successfully. Please check your email for OTP verification."));
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError("All fields are required!");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found!")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Credential!");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");
    loggedInUser.refreshToken = refreshToken;

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24
    };

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "Login done successfully"));
});

export const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "Logout Successfully"));
});

export const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError("Email and OTP are required!");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found!");
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
        throw new ApiError(400, "Invalid or expired OTP!");
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.json(new ApiResponse(200, {}, "OTP verified successfully."));
});

export const home = asyncHandler(async (req, res) => {
    return res.json(new ApiResponse(200, "Home Page"));
});
