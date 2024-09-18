import express from "express";
import dotenv from "dotenv";
import "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AdminRouter } from "./routes/auth.js";
import { studentRouter } from "./routes/student.js";
import { bookRouter } from "./routes/book.js";
import { Book } from "./models/Book.js";
import { studentModel } from "./models/Student.js";
import { adminModel } from "./models/admin.js";

const app= express();
app.use(express.json());
//to handle cors error when we store token in cookies when we login to the system
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}));
app.use(cookieParser());
app.use('/auth',AdminRouter)
app.use('/student',studentRouter)
app.use('/book',bookRouter)

dotenv.config();

app.get('/dashboard',async (req,res)=>{
    try{
        const student= await studentModel.countDocuments();
        console.log(student);
        const admin= await adminModel.countDocuments();
        console.log(admin);
        const book= await Book.countDocuments();
        console.log(book);
        return res.json({ok:true,student,book,admin});
    } catch(err){
        return res.json(err);
    }
})
//This is the main file of backend where we run our node.js app or server.

app.listen(process.env.PORT,()=>{
    console.log("Server is running.");
})