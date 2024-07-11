import { Router } from "express";
import {allReportsByStatus} from "../controllers/report.controller.js" 

export const reportRouter = Router()

reportRouter.route("/").get(allReportsByStatus)