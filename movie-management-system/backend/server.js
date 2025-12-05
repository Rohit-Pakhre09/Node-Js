import { app } from "./app.js";
import "dotenv/config"
import { connectDB } from "./configs/db.js";

const PORT = process.env.PORT;
const URI = process.env.MONGODB_URI;

await connectDB(URI);
app.listen(PORT, () => {
    console.log("App Server Started");
}); 