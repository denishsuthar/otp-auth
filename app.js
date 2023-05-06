import express from "express";
import { config } from "dotenv";

const app = express();
app.use(express.json())

// Config File
config({
    path:"./config/config.env"
})


app.get("/", (req,res)=>{
    res.send("Welcome")
})

// Importing & Using Routes
import userRoute from "./routes/useRoute.js"
app.use("/api/v1", userRoute)

export default app