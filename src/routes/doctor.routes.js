import { Router } from 'express'
import { login, logout, registerDoctor } from '../controllers/doctor.controller.js'
import {jwtAuth} from "../middlewares/auth.js"

export const doctorRouter = Router()

doctorRouter.route("/register").post(registerDoctor)
doctorRouter.route("/login").post(login)
doctorRouter.route("/logout").post(jwtAuth, logout)