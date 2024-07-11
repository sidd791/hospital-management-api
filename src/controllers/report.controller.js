import asyncHandler from "../../utils/asyncHandler.js"
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"
import {Report} from "../models/report.model.js"
import {Patient} from "../models/patient.model.js"


export const allReportsByStatus = asyncHandler(async (req, res) => {
    const { status } = req.query;
    if (!status) {
        throw new ApiError(404, "Status not found")
    }
    console.log("Status Query:", status);

    // Check if the status is defined
    if (!status) {
        throw new ApiError(400, "Status query parameter is required");
    }

    // Find reports with the specified status and populate the name field
    const allReports = await Report.find({ status }).populate('name');

    // Log the raw reports found
    console.log("Raw Reports Found:", allReports);

    // Check if any reports were found
    if (!allReports || allReports.length === 0) {
        console.log("No reports found with the status:", status);
        throw new ApiError(404, "Reports not found");
    }

    // Send the response
    res.status(200).json(new ApiResponse(200, allReports, "All Reports"));
});