import { useState } from 'react';
import '../css/AddStudent.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function AddStudent() {
  const [roll,setRoll]=useState("");
  const[username,setUsername]=useState("");
  const [grade,setGrade]=useState("");
  const [password,setPassword] = useState("");
  const navigate=useNavigate();

  //Logic to pass the data to server side
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/student/resister',{roll,username,password,grade})
    .then(res=>{
      if(res.data.registered){
        alert("Student added successfully.");
        navigate('/Dashboard');
      }
      console.log(res);
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Add Student</h2>
        <div className="form-group">
            <label htmlFor="roll">Roll No:</label>
            <input type="text" id="roll" name="roll"
            onChange={(e)=>setRoll(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label htmlFor="username">User Name:</label>
            <input type="text" id="username" name="username"
            onChange={(e)=>setUsername(e.target.value)}
            />
            
        </div>

        <div className="form-group">
            <label htmlFor="grade">Grade:</label>
            <input type="text" id="grade" name="grade"
            onChange={(e)=>setGrade(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
        </div>

        <button className="btn-resister" type="submit">Resister</button>
      </form>
    </div>
  )
}

export default AddStudent
