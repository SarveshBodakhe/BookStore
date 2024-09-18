import express from "express";
import { studentModel } from "../models/Student.js"; 
import bcrypt from "bcrypt";
import { verifyAdmin } from "./auth.js";
const router = express.Router();

//protected route because of middleware...

router.post('/resister',verifyAdmin,async(req,res)=>{
    try{
        const {username,password,roll,grade}=req.body;

        const student=await studentModel.findOne({username});

        if(student){
            return res.json({message:"Student is regigtered."})
        }

        const hashpassword=await bcrypt.hash(password,10);

        const newStudent = new studentModel({
            username,
            password:hashpassword,
            roll:roll,
            grade
        })

        await newStudent.save();
        return res.json({registered:true})
    }catch(err)
    {
        return res.json({message:"Error in resistering the student."})
    }
})

export {router as studentRouter}