import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();



// Listing to Server
app.listen(process.env.PORT, ()=>{
    console.log(`Server is Working on ${process.env.PORT}`);
})