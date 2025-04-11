import { UserController } from "../controllers/userController.js";
import {Router} from "express"
import { logger } from "../middlewares/logger.js";

const userController = new UserController()

const userRoutes = Router()

userRoutes.post("/user",logger,userController.createUser)
userRoutes.get("/users",logger,userController.getUsers)
userRoutes.put("/user/:id",logger,userController.updateUser)
userRoutes.delete("/user/:id",logger,userController.deleteUser)


export {userRoutes}
