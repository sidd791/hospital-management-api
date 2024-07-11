import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyparser from "body-parser"
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import {doctorRouter} from "./src/routes/doctor.routes.js"
import { patientRouter } from './src/routes/patient.routes.js'
import { reportRouter } from './src/routes/report.routes.js'

app.use("/doctors", doctorRouter)
app.use("/patients", patientRouter)
app.use("/reports", reportRouter)

export default app