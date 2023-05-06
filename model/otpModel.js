import mongoose, { Schema } from "mongoose";

export const Otp = mongoose.model("otp", Schema({
    number:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        index:{expires:300}
    }
    // After 5 min otp automatically deleted in database
}, {timestamps: true}))