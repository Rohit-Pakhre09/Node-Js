import { app } from "./index.js";
import "dotenv/config";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT;
const DB_URI = process.env.MONGO_URI;

connectDB(DB_URI);

app.listen(PORT, () => {
    console.log("Express server started.");
});