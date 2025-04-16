import app from "./app.js"
import { config } from "./config/config.js"
import { connectDB } from "./tools/databaseConnection.js"

connectDB();

app.listen(config.PORT, () => {
  console.log(`Server running on PORT: ${config.PORT}`)
});
