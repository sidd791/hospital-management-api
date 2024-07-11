import { Router } from "express";
import { allReportsByPatient, createReport, registerPatient } from "../controllers/patient.controller.js";
import { jwtAuth } from "../middlewares/auth.js";

export const patientRouter = Router()

patientRouter.route("/register").post(registerPatient)
patientRouter.route("/:id/create_report").post(jwtAuth, createReport)
patientRouter.route("/:id/all_reports").get(jwtAuth, allReportsByPatient)