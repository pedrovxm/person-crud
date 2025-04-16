import amqp from "amqplib";
import { logModel } from "../models/logModel.js";
import { config} from "../config/config.js"

let connection;

async function listen(){
	try {
		
		connection = await amqp.connect(config.rabbit_mq_url);
		const channel = await connection.createChannel();


		process.once("SIGINT", async () => {
			await channel.close();
			await connection.close();
		});

		await channel.assertQueue(config.rabbit_mq_queue, { durable: false });
		await channel.consume(
			config.rabbit_mq_queue,
			async (message) => {
				if (message) {
					console.log(
						" [x] Received '%s'",
						JSON.parse(message.content.toString())
					);

					const log = new logModel(JSON.parse(message.content.toString()));
					await log.save();



				}
			},
			{ noAck: true }
		);

		console.log(" [*] Waiting for messages. To exit press CTRL+C");
	} catch (err) {
		console.warn(err);
	}
};

export const closeConnection = async () => {
	if (connection)
		await connection
			.close()
			.then(() => console.log("Rabbitmq connection closed"));
}



export {listen}



