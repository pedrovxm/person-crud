import { JwtService } from "../services/jwt/jwt.js"
import { redisClient } from "../services/redis/redis.js"
import { config } from "../config/config.js"



class AuthController{
    async validate(req,res){
        try{
            const {apiKey} = req.body

            const token = JwtService.generateToken(apiKey)

            await redisClient.set(token,apiKey)

            const isValid = apiKey === config.apiKey

            if(!isValid){
               return res.status(400).json({message : "API KEY validation failed"})
            }

            return res.status(200).json({token: `${token}`})
            


        }catch(err){
            return res.status(400).json({error: "Error validating API KEY"})
        }
    }
}



export {AuthController}