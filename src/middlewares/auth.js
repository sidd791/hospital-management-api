import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { Doctor } from "../models/doctor.model.js";
import jwt from "jsonwebtoken"

export const jwtAuth = asyncHandler(async(req, res, next)=>{
    try {
        const token = req.cookies?.token || req.headers["authorization"]?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(404, "Token not found")
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if (!decodedToken) {
            throw new ApiError(404, "Token not decoded")
        }
        const user = await Doctor.findById(decodedToken._id).select("-password -token")
        req.user = user
        next()
    } catch (error) {
        console.log("Error", error)
        next(error)
    }
})