import { UserController } from "../controllers/userController.js";
import {Router} from "express"

const userController = new UserController()

const userRoutes = Router()

userRoutes.post("/user",userController.createUser)
userRoutes.get("/users",userController.getUsers)


export {userRoutes}
