import { UserController } from "../controllers/userController.js"
import {Router} from "express"
import { logger } from "../middlewares/logger.js"
import { authenticateKey } from "../middlewares/authentication.js"

const userController = new UserController()

const userRoutes = Router()

userRoutes.post("/users",authenticateKey,logger,userController.createUser)
userRoutes.get("/users",logger,userController.getUsers)
userRoutes.put("/users/:id",logger,userController.updateUser)
userRoutes.delete("/users/:id",logger,userController.deleteUser)


export {userRoutes}
