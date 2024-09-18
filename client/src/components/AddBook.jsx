import { useState } from 'react';
import '../css/AddBook.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function AddBook() {
  const [name,setName]=useState("");
  const [author,setAuthor]=useState("");
  const [imageUrl,setImageUrl]=useState("");
  const navigate=useNavigate();

  //Logic to pass the data to server side
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/book/add', {name, author, imageUrl})
    .then(res=>{
      if(res.data.added)
      {
        navigate('/books');
      }
      else
      {
        console.log(res);
      }
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className="book-form-container">
      <form className="book-form" onSubmit={handleSubmit}>
        <h2>Add a Book</h2>
        <div className="form-group">
            <label htmlFor="book">Book Name:</label>
            <input type="text" id="book" name="book"
            onChange={(e)=>setName(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label htmlFor="author">Author Name:</label>
            <input type="text" id="author" name="author"
            onChange={(e)=>setAuthor(e.target.value)}
            />
            
        </div>

        <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input type="text" id="image" name="image"
            onChange={(e)=>setImageUrl(e.target.value)}
            />
        </div>

        <button className="btn-resister" type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default AddBook
