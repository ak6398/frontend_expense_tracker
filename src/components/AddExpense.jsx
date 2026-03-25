import React, { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const AddExpense = () => {
    const navigate = useNavigate();
    const [addata, setData] = useState({
        ExpenseDate: '',
        ExpenseItem: '',
        ExpenseCost: ''
    });

    const userId=localStorage.getItem('userId');
    useEffect(()=>{
        if(!userId){
            navigate('/login')
        }
    },[])

    const Handlechange = (e) => {
        setData({ ...addata, [e.target.name]: e.target.value });
    };

    const handleSubmit=async (e) => {
          e.preventDefault();
          try{
            const response=await fetch(`${API_BASE_URL}/api/add_expense/`,{
              method:'POST',
              header:{'Content-Type':'application/json'},
              body:JSON.stringify({
                ...addata,
                UserId:userId
              })
            });
            if(response.status===201){
              toast.success("Expense add succesffuly!!");
              setTimeout(() => {
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
        <div className="container mt-5" style={{ maxWidth: "420px" }}>
            <div className="text-center">
                <h2>
                    <i className="fas fa-receipt me-2"></i> Add Expense
                </h2>
                <p className="text-muted">Track your spending below</p>
            </div>

            <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
                {/* Expense Date */}
                <div className="mb-3">
                    <label className="form-label">Date of Expense</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="fas fa-calendar-alt"></i>
                        </span>
                        <input
                            type="date"
                            name="ExpenseDate"
                            onChange={Handlechange}
                            value={addata.ExpenseDate}
                            className="form-control"
                            required
                        />
                    </div>
                </div>

                {/* Expense Item */}
                <div className="mb-3">
                    <label className="form-label">Expense Item</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="fas fa-shopping-cart"></i>
                        </span>
                        <input
                            type="text"
                            name="ExpenseItem"
                            onChange={Handlechange}
                            value={addata.ExpenseItem}
                            className="form-control"
                            placeholder="What did you buy?"
                            required
                        />
                    </div>
                </div>

                {/* Expense Cost */}
                <div className="mb-3">
                    <label className="form-label">Cost ($)</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="fas fa-dollar-sign"></i>
                        </span>
                        <input
                            type="number"
                            name="ExpenseCost"
                            onChange={Handlechange}
                            value={addata.ExpenseCost}
                            className="form-control"
                            placeholder="0.00"
                            step="0.01"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-success w-100">
                    <i className="fas fa-plus-circle me-2"></i>
                    Add Expense
                </button>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AddExpense;