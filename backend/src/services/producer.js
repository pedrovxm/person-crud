import amqp from "amqplib"
import { config} from "../config/config.js"

async function sendToQueue (queueName, data) {
   let connection

   try {
       connection = await amqp.connect(config.rabbit_mq_url)
       const channel = await connection.createChannel()

       await channel.assertQueue(queueName, { durable: false })


       channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
       console.log(` [x] Sent message to queue "${queueName}"`)
       await channel.close()
   } catch (err) {
       console.warn("Erro ao enviar para fila:", err)
   } finally {
    if (connection) await connection.close()
   }
}

export {sendToQueue}