import React,{useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Login=()=>{

    const navigate=useNavigate()
        const [formdata,setFormData]=useState({
            Email :'',
            Password:''
    
        });
    
        const Handlechange=(e)=>{
            setFormData({...formdata,[e.target.name]:e.target.value});
        };
    
        const submitChange=async (e) => {
          e.preventDefault();
          try{
            const response=await fetch(`${API_BASE_URL}/api/login/`,{
              method:'POST',
              header:{'Content-Type':'application/json'},
              body:JSON.stringify(formdata)
            });
            const data=await response.json()
            
            if(response.status===200){
              toast.success("login successful !");
              localStorage.setItem('userId',data.userId);
              localStorage.setItem('username',data.username);
              
              setTimeout(() => {
                navigate('/dashboard')
              }, 2000);
            }
            else{
              
              toast.error(data.message)
            }
          }
          catch (error){
            console.error('Error',error);
            toast.error('Something went wrong!!')
          }
        };


    return(
        <div className="container mt-5"  style={{ maxWidth: "420px" }}>
            <div className="text-center">
        <h2>
          <i className="fas fa-sign-in-alt"></i> Login
        </h2>
        <p className="text-muted">Access to your expense Dashboard</p>

        <form className="p-4 border rounded shadow" onSubmit={submitChange}>

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
              className="form-control"
              placeholder="Enter Email"
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
              className="form-control"
              placeholder="Enter password"
            />
          </div>
        </div>

        {/* Example Button */}
              <button type="submit" className="btn btn-primary w-100"><i className="fas fa-sign-in-alt "></i>
                Login
              </button>
       
      </form>
      <ToastContainer/>
      </div>
        </div>
    )
}
export default Login