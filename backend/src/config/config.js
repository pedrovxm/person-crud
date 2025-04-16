import dotenv from "dotenv"

dotenv.config()

const config ={
    PORT : process.env.PORT,
    mongoURL : process.env.MONGOURL,
    rabbit_mq_url : process.env.RABBIT_MQ_URL,
    rabbit_mq_queue : process.env.RABBIT_MQ_QUEUE
}



export {config}