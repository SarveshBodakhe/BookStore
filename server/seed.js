import bcrypt from "bcrypt";
import "./db.js";
import { adminModel } from "./models/admin.js";

//Here we make a file seed.js in server folder for hasing the passwords for admin.

async function AdminAccount(){
    try{
        //if there was no record of admin ...we create new record for the admin.
        const adminCount = await adminModel.countDocuments();
        if(adminCount===0){
            const hashPassword = await bcrypt.hash('adminpassword',10)
            //Here we save admin info to the database by using that adminModel (admin schema).

            const newAdmin = new adminModel({
                username:"admin",
                password:hashPassword
            })
           await newAdmin.save();
            console.log("Account Created!!!");
        }
        else
        {
            console.log("Account already exists.");
        }
    } catch(err){
        console.log("Error: "+err);
    }
}

AdminAccount();
