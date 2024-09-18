import express from "express";
import { adminModel } from "../models/admin.js"; // Use relative path
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';
import { studentModel } from "../models/Student.js";

const router = express.Router();

// Middleware to handle cookies
router.use(cookieParser());

// Request is sent from frontend and response is sent from server to frontend.
router.post('/login', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (role === 'admin') {
            // Find a record based on username.
            const admin = await adminModel.findOne({ username });
            if (!admin) {
                return res.status(400).json({ message: "Admin not registered." });
            }

            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Wrong Password." });
            }
            //paylod that is in jwt.sign function
            const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_key);
            // We should store token inside the cookie.
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'admin' });
        } else if (role === 'student') {
            const student = await studentModel.findOne({ username });
            if (!student) {
                return res.status(400).json({ message: "student not registered." });
            }

            const validPassword = await bcrypt.compare(password, student.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Wrong Password." });
            }

            //paylod that is in jwt.sign function...
            const token = jwt.sign({ username: student.username, role: 'student' }, process.env.Student_key);

            // We should store token inside the cookie.
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'student'});
        } else {
            return res.status(400).json({ message: "Invalid role specified." });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

//It is a middleware
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.Admin_key, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.username = payload.username;
        req.role = payload.role;
        if (req.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    });
};

const verifyUser = (req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.json({message:"Invalid User"})
    }
    else
    {
        jwt.verify(token,process.env.Admin_key,(err,payload)=>{
            if(err)
            {
                jwt.verify(token,process.env.Student_key,(err,payload)=>{
                    if(err)
                    {
                        return res.json({message:"Invalid token"})
                    }
                    else
                    {
                        req.username=payload.username;
                        req.role=payload.role;
                        next();
                    }
                })
            }
            else
            {
                req.username=payload.username;
                req.role=payload.role;
                next();
            }
        })
    }
}

router.get('/verify',verifyUser,(req,res)=>{
    return res.json({login:true, role:req.role})
})
router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({logout:true});
})

export { router as AdminRouter,verifyAdmin };
