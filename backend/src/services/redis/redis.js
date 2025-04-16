import pkg from 'redis'
const { createClient } = pkg;
import { config } from "../../config/config.js"


let redisClient

(async () =>{
    redisClient = createClient({url: config.redisURL})

    redisClient.on("error",(error)=> console.error(`Redis ${error}`))

    await redisClient.connect()
})()

export {redisClient}