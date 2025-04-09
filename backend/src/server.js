import express from "express"
import { config } from "./config/config.js"
import { connectDB } from "./tools/databaseConnection.js"


connectDB()
const app = express()

app.use(express.json())

app.listen(config.PORT,()=>{
    console.log(`Server running in PORT : ${config.PORT}`)
})




