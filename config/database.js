import mongoose from "mongoose";

export const connectDB =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data)=>{
        console.log(`MongoDB connected wih Host ${data.connection.host}`);
    }).catch((err)=>{
        console.log(`Cant Connect ${err}`);
    })
}