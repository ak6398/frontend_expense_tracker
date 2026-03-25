import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const Dashboard=()=>{
    const navigate=useNavigate()
    const userId=localStorage.getItem('userId');
    useEffect(()=>{
            if(!userId){
                navigate('/login')
            }
        },[])
    return(
        <>
        <div className="container text-center">
            <h2>Welcome to Daily Expense tracker</h2>
            <p>Track your Daily expenses easily and efficiently</p>

            <div className="mt-4">
                {userId?(
                    <>
                    <Link to='/dashboard' className="btn btn-warning mx-2"><i className="fas fa-tachometer-alt me-2"/>Go To Dashboard</Link>
                    </>
                ):(
                    <>
                    
                        <Link to='/login' className="btn btn-success mx-2"><i className="fas fa-sign-in-alt me-2"/>Login</Link>
                        <Link to='/signup' className="btn btn-primary mx-2"><i className="fas fa-user-plus me-2"/>Signup</Link>
                    </>
                )}
              
            </div>
        </div>
        
        </>
    )
}
export default Dashboard;