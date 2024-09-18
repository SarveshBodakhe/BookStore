import {Link} from "react-router-dom";
import "../css/Navbar.css";
// eslint-disable-next-line react/prop-types
function Navbar({role}) {
  return (
    <nav className="navbar">
    <div className="navbar-left">
        <Link to="/" className="navbar-brand">BookStore</Link>
    </div>
    <div className="navbar-right">
        <Link to="/books" className="navbar-link">Books</Link>
        
        {/*for admin we see only this links */}
        {role === "admin" && <>
        <Link to="/addbook" className="navbar-link">Add Book</Link>
        <Link to="/addstudent" className="navbar-link">Add Student</Link>
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        </>
        }
        
        {role === "" ? <Link to="/login" className="navbar-link">Login</Link>
        : <Link to="/logout" className="navbar-link">Logout</Link>
        }
        
       {/* (when you click on books you should move to books component and so on) */}
    </div>
    </nav>
  )
}

export default Navbar
