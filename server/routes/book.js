import express from "express";
import { Book } from "../models/Book.js";
import { verifyAdmin } from "./auth.js";
const router = express.Router();

// Protected route because of middleware
router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, author, imageUrl } = req.body;

        if (!name || !author || !imageUrl) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newBook = new Book({
            name,
            author,
            imageUrl,
        });

        await newBook.save();
        return res.json({ added: true });
    } catch (err) {
        console.error("Error in adding the book:", err);
        return res.status(500).json({ message: "Error in adding the book." });
    }
});


router.get('/books',async(req,res)=>{
    try{
        const books = await Book.find();
        return res.json(books);
    }catch(err){
        return res.json(err);
    }
});

router.get('/book/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const book = await Book.findById({_id: id})
        return res.json(book)
    }catch(err){
        return res.json(err);
    }
});

router.put('/book/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate({_id:id}, req.body)
        return res.json({updated:true,book})
    }catch(err){
        return res.json(err);
    }
});

router.delete('/book/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const book = await Book.findByIdAndDelete({_id:id});
        return res.json({deleted:true,book});
    }catch(err){
        return res.json(err);
    }
});

export { router as bookRouter };
