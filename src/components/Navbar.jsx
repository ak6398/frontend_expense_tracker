import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate= useNavigate()
  const userId=localStorage.getItem('userId');
  const username=localStorage.getItem('username')
  console.log("userid is",userId);
  console.log("username is",username);

  const handleLogout=()=>{
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">

        
      <div className="container">
        <Link className="navbar-brand" to="/home"><i className="fas fa-wallet me-2"></i>Expense Tracker</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <Link className="nav-link active" to="/home"><i className="fa fa-home me-2"></i>Home</Link>
            </li>
            {userId ?(
              <>

            <li className="nav-item">
              <Link className="nav-link" to="/add-expense"><i className="fa fa-plus-square me-2"></i>Add Expense</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/manage_expense"><i className="fa fa-tasks me-2"></i>Manage Expense</Link>
            </li>
{/* 
             <li className="nav-item">
              <Link className="nav-link" to="#"><i className="fa fa-flag me-2"></i> Expense Report</Link>
            </li> */}

            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              <i className="fa fa-sign-out me-2"></i> Logout
            </button>
              </>
            ) :(
              <>
              <li className="nav-item">
              <Link className="nav-link" to="/signup"><i className="fas fa-user-plus me-2"></i>Signup</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login"><i className="fa fa-sign-in me-2"></i>Login</Link>
            </li>
              </>
            )}
          

           

          </ul>
        </div>
      </div>
     
    </nav>
  );
};

export default Navbar;
