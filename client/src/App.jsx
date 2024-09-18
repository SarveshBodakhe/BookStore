import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Books from './components/Books';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import { useEffect, useState } from 'react';
import Logout from './components/Logout';
import axios from 'axios';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
function App() {

  const [role,setRolee] = useState('');

  axios.defaults.withCredentials=true;
  //I will use useEffect hook here
  useEffect(()=>{
    axios.get('http://localhost:3001/auth/verify')
      .then(res=>{
        if(res.data.login)
        {
          setRolee(res.data.role);
        }
        else
        {
          setRolee("");
        }

        console.log(res);
      }).catch(err=>console.log(err));
  }, [])

  return (
    <BrowserRouter>
      <Navbar role={role}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books" element={<Books role={role} />}></Route>
        <Route path="/login" element={<Login setRolee={setRolee} />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/addstudent" element={<AddStudent />}></Route>
        <Route path="/logout" element={<Logout setRolee={setRolee} />}></Route>
        <Route path="/addbook" element={<AddBook />}></Route>
        <Route path="/book/:id" element={<EditBook />}></Route>
        <Route path="/delete/:id" element={<DeleteBook />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
