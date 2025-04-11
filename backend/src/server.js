import express from "express"
import { config } from "./config/config.js"
import { connectDB } from "./tools/databaseConnection.js"
import { userRoutes } from "./routes/userRoutes.js"

connectDB()
const app = express()

app.use(express.json())
app.use(userRoutes)


app.listen(config.PORT,()=>{
    console.log(`Server running in PORT : ${config.PORT}`)
})




