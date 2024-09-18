import mongoose from "mongoose";

// here we define admin schema and export the adminModel for future use.

const adminSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const adminModel = mongoose.model("Admin",adminSchema)

export {adminModel}