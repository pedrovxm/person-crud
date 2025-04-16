import express from "express"
import { userRoutes } from "./routes/userRoutes.js"
import { logRouter } from "./routes/logRoutes.js"
import {listen} from "./services/consumer.js"

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(logRouter);

listen()

export default app
