import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    number: {
        type:String,
        required:true
    }
}, { timestamps: true });



// Generating Token
userSchema.methods.generateJWT = function () {
    const token = jwt.sign({ _id: this._id, number: this.number }, process.env.JWT_SECRET, {
        expiresIn: "5d"
    })
    return token;
}


export const User = mongoose.model("User", userSchema)