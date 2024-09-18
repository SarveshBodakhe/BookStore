import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Here we connect to the database using mongoose.connect method.
const Connection = async ()=>{
    try{
        mongoose.connect(process.env.URL)
        console.log("Connected");
    } catch(err){
        console.log("Error: "+err);
    }
}

Connection()