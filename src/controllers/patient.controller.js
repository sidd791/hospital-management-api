import asyncHandler from "../../utils/asyncHandler.js";
import {Patient} from "../models/patient.model.js"
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {Report} from "../models/report.model.js"
import {Doctor} from "../models/doctor.model.js"

export const registerPatient = asyncHandler(async(req, res)=>{
    const {phNo, fullname} = req.body
    if (!phNo || !fullname) {
        throw new ApiError(404, "Phone number and full name are required.")
    }
    const existingPatient = await Patient.findOne({phNo : phNo})
    if (existingPatient) {
        throw new ApiError(402, existingPatient, "Patient already exists")
    }
    const patient = await Patient.create({
        phNo,
        fullname
    })
    if (!patient) {
        throw new ApiError(401, "Cannot create patient")
    }
    res.status(200).json(new ApiResponse(200, patient, "Patient registered successfully"))
})

export const createReport = asyncHandler(async(req, res)=>{
    const {id} = req.params
    const {status} = req.query
    const doctorId = req.user._id
    console.log("ID : ", id)
    console.log("Status : ", status)
    console.log("Doctor Id : ", doctorId)
    if (!id || !status || !doctorId) {
        throw new ApiError(404, "ID, Status and doctorId are required.")
    }

    const patient = await Patient.findById(id)
    if (!patient) {
        throw new ApiError(404, "Patient not found")
    }
    const doctor = await Doctor.findById(doctorId)
    const report = await Report.create({
        name : patient,
        createdby : doctor,
        status
    })
    res.status(200).json(new ApiResponse(200, report, "Patient report."))
})
export const allReportsByPatient = asyncHandler(async(req, res)=>{
    const {id} = req.params
    const patient = await Patient.findById(id)
    if (!patient) {
        throw new ApiError(404, "Patient not found")
    }
    const allReports = await Report.find({name : patient._id}).populate("name")
    if (!allReports) {
        throw new ApiError(404, "Cannot find reports")
    }
    res.status(200).json(new ApiResponse(200, allReports, "All reports"))
})