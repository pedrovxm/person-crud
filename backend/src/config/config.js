import dotenv from "dotenv"

dotenv.config()

const config ={
    PORT : process.env.PORT,
    mongoURL : process.env.MONGOURL,
    rabbit_mq_url : process.env.RABBIT_MQ_URL,
    rabbit_mq_queue : process.env.RABBIT_MQ_QUEUE,
    jwt_secret : process.env.JWT_SECRET,
    jwt_expiration_time : process.env.JWT_EXPIRATION_TIME,
    redisURL : process.env.REDIS_URL,
    apiKey : process.env.API_KEY
}



export {config}