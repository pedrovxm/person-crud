import express from "express"
import { userRoutes } from "./routes/userRoutes.js"
import { logRouter } from "./routes/logRoutes.js"
import {listen} from "./services/consumer.js"
import { authRoutes } from "./routes/authRoutes.js"
import { connectDB } from "./tools/databaseConnection.js"

const app = express()

connectDB()

app.use(express.json())
app.use(userRoutes)
app.use(logRouter)
app.use(authRoutes)

listen()

export default app
