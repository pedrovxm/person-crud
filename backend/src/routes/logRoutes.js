import {Router} from "express"
import { LogController } from "../controllers/logController.js"


const logRouter = Router()
const logController = new LogController()



logRouter.get("/logs",logController.findMany)


export {logRouter}