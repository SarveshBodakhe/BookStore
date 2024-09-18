/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../css/Dashboard.css";
import axios from "axios";
function Dashboard() {

  //use the useffect hook to return the data from server side...

  const [students,setStudents] = useState(0);
  const [admin,setAdmin] = useState(0);
  const [books,setBooks] = useState(0);

  useEffect(()=>{
    axios.get('http://localhost:3001/dashboard')
    .then(res=>{
      if(res.data.ok){
        setStudents(res.data.student);
        setAdmin(res.data.admin);
        setBooks(res.data.book);
      }
    }).catch(err=>console.log(err));
  }, [])

  return (
    <div className="dashboard">
    <div className="dashboard-box">
      <h2>Total Books</h2> <br></br>
      <h2>{books}</h2>
    </div>
    <div className="dashboard-box">
      <h2>Total Students</h2> <br></br>
      <h2>{students}</h2>
    </div>
    <div className="dashboard-box">
      <h2>Total Admins</h2> <br></br>
      <h2>{admin}</h2>
    </div>
      
    </div>
  )
}

export default Dashboard