import { connectDB } from "./config/db.js";
import { app } from "./index.js";
import "dotenv/config"

const PORT = process.env.PORT;

// Server
app.listen(PORT, () => {
    console.log("Server is live.");
});

// MongoDB Server
await connectDB();