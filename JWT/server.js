import "dotenv/config";
import { app } from "./index.js";
import { connectDb } from "./connection/db.js";

const PORT = process.env.PORT;
const URI = process.env.MONGODB_URI;

await connectDb(URI);
app.listen(PORT, () => {
    console.log("Server Started");
});