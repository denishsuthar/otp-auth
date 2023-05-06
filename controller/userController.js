import bcrypt from "bcrypt"
import _ from "lodash"
import axios from "axios"
import otpGenerator from "otp-generator"
import { User } from "../model/userModel.js"
import { Otp } from "../model/otpModel.js"
import {catchAsyncError} from "../Middelware/catchAsyncError.js"

// SignUp
export const signUp = async(req, res)=>{
    const user = await User.findOne({number : req.body.number})
    if(user) return res.status(400).send("User Alredy Registred!")

    const OTP = otpGenerator.generate(6,{
        digits:true,
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });
    const number = req.body.number;
    console.log(OTP);

    const otp = new Otp({number:number, otp:OTP});
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);

    const result = await otp.save();
    return res.status(200).send("OTP Sent Successfully!")
}



// VerifyOTP
export const VerifyOtp = async (req, res) => {
    const otpHolder = await Otp.find({number:req.body.number});
    if(otpHolder.length === 0) return res.status(400).send("You Entered Expired OTP")
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
    
    if(rightOtpFind.number === req.body.number && validUser){
        const user = new User(_.pick(req.body["number"]));
        const token = user.generateJWT();
        const result = await user.save();
        const OTPDelete = await Otp.deleteMany({
            number: rightOtpFind.number
        });
        return res.status(200).send({
            message:"User Registed Successfully",
            token:token,
            data:result
        })
    }else{
        return res.status(400).send("Your OTP was Wrong")
    }
}