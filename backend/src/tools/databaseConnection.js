import mongoose from "mongoose"
import { config } from "../config/config.js"


async function connectDB(){
    try{
        mongoose.connect(config.mongoURL)
        console.log('Database Connected')
    }catch(err){
        console.log(`Error connecting database: ${err}`)
    }
}


export{connectDB}