import {Router} from "express"
import { AuthController } from "../controllers/authController.js"


const authRoutes = Router()

const authController = new AuthController()

authRoutes.post("/auth/validate",authController.validate)


export {authRoutes}