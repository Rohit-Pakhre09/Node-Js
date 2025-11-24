import { app } from "./app.js";

const port = 3000;

// Server listen
app.listen(port, () => {
    console.log(`Check: http://localhost:${port}/`);
});