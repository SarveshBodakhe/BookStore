/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import '../css/login.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Login({setRolee}) {
  // eslint-disable-next-line no-unused-vars
  const [username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const [role,setRole]=useState("");

  //to navigate directly to dashborad.
  const navigate=useNavigate();

  axios.defaults.withCredentials=true;

  //Logic to pass the data to server side
  const handleSubmit=()=>{
    console.log(username,password,role);
    axios.post('http://localhost:3001/auth/login',{username,password,role})
    .then(res=>{
      if(res.data.login && res.data.role === 'admin'){
        setRolee('admin');
        alert("Admin logged in successfully.");
        //to navigate directly to dashborad.
        navigate('/dashboard');
      } else if(res.data.login && res.data.role === 'student')
      {
        setRolee('student');
        alert("Student logged in successfully.");
        navigate('/');
      }
      console.log(res);
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className='login-page'>
    <div className='login-container'>
      <h2>Login</h2>
      <br></br>
      <div className="form-group">
      <label htmlFor="username">Username:</label>
      <input type="text" placeholder="Enter Username"
      onChange={(e)=>setUsername(e.target.value)}></input>
      </div>
      <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input type="password" placeholder="Enter Password" 
      onChange={(e)=>setPassword(e.target.value)}></input>
      </div>
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <select name="role" id="role"
        onClick={(e)=>{console.log(e.target.value);
        setRole(e.target.value)}
        }>

          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>
      </div>
      <button className='btn-login' onClick={handleSubmit}>Login</button>
    </div>
    </div>
  )
}

export default Login
