import React,{useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Signup = () => {

    const navigate=useNavigate()
    const [formdata,setFormData]=useState({
        FullName :'',
        Email :'',
        Password:''

    });

    const Handlechange=(e)=>{
        setFormData({...formdata,[e.target.name]:e.target.value});
    };

    const submitChange=async (e) => {
      e.preventDefault();
      try{
        const response=await fetch(`${API_BASE_URL}/api/signup/`,{
          method:'POST',
          header:{'Content-Type':'application/json'},
          body:JSON.stringify(formdata)
        });
        if(response.status===201){
          toast.success("signup successful ! Please login.");
          setTimeout(() => {
            navigate('/login')
          }, 2000);
        }
        else{
          const data=await response.json();
          toast.error(data.message)
        }
      }
      catch (error){
        console.error('Error',error);
        toast.error('Something went wrong!!')
      }
    };


  return (
    <div className="container mt-5"  style={{ maxWidth: "420px" }}>
      <div className="text-center">
        <h2>
          <i className="fas fa-user-plus me-2"></i> Signup
        </h2>
        <p className="text-muted">Create your Account for tracking expenses</p>
      </div>

      <form className="p-4 border rounded shadow" onSubmit={submitChange}>
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              name="FullName"
              onChange={Handlechange}
              value={formdata.FullName}
              className="form-control"
              placeholder="Name"
            />
          </div>
        </div>

        {/* Email */}
        
        <div className="mb-3">
          <label className="form-label">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              name="Email"
              onChange={Handlechange}
              value={formdata.Email}
              className="form-control"
              placeholder="Email"
            />
          </div>
        </div>

        {/* password */}

        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="password"
              name="Password"
              onChange={Handlechange}
              value={formdata.Password}
              className="form-control"
              placeholder="password"
            />
          </div>
        </div>

        {/* Example Button */}
              <button type="submit" className="btn btn-primary w-100"><i className="fas fa-user-plus me-2 "></i>
                Sign Up
              </button>
       
      </form>

      <ToastContainer/>
    </div>
  );
};

export default Signup;
