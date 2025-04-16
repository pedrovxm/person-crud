import { redisClient } from "../services/redis/redis.js"
import {config} from "../config/config.js"


async function authenticateKey(req,res,next){
    let token = req.header("token")

    if(!token){
        return res.status(400).json({message: "Error processing token"})
    }

    try{
        const value = await redisClient.get(token)

        if(value !== config.apiKey){
            return res.status(400).json({message: "Invalid Token"})
        }

        next()
    }catch(err){
        return res.status(500).json({message: "Erro ao validar token"})
    }
}


export {authenticateKey}