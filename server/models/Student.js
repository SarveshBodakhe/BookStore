import mongoose from "mongoose";

// here we define Student schema and export the studentModel for future use.

const studentSchema = new mongoose.Schema({
    roll:{type:String,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    grade:{type:String}
})

const studentModel = mongoose.model("Student",studentSchema)

export {studentModel}