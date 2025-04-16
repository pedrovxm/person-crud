import jwt from "jsonwebtoken"
import { config } from "../../config/config.js"


export class JwtService {
    static generateToken(apiKey){
        const data = {apiKey}

        return jwt.sign(data,config.jwt_secret,{expiresIn:config.jwt_expiration_time})
    }

    static verifyToken(token){
        try{
            const decoded = jwt.verify(token,config.jwt_secret)
            return decoded
        }catch(err){
            throw new Error("Invalid API Key")
        }
    }
}