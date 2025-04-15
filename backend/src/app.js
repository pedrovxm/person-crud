import express from "express"
import { userRoutes } from "./routes/userRoutes.js"
import { logRouter } from "./routes/logRoutes.js"

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(logRouter);

export default app
