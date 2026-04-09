import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';

const Manage_Expense = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userId');

    // State to hold the expense data being edited
    const [editExpense, setEditExpense] = useState({
        id: "",
        ExpenseDate: "",
        ExpenseItem: "",
        ExpenseCost: ""
    });

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        fetchExpenses(userId);
    }, [userId, navigate]);

    // ✅ Optimized fetch with caching
    const fetchExpenses = async(userId) => {
        setLoading(true);
        try {
            const data = await apiClient.get(`/api/manage_expense/${userId}?page=1&page_size=20`);
            setExpenses(data.expenses || []);
        } catch (error) {
            console.error("Error Fetching Expenses:", error);
            toast.error("Failed to fetch expenses");
        } finally {
            setLoading(false);
        }
    };

    // Function to populate the modal state when Edit is clicked
    const handleEditClick = (expense) => {
        setEditExpense({
            id: expense.id,
            ExpenseDate: expense.ExpenseDate,
            ExpenseItem: expense.ExpenseItem,
            ExpenseCost: expense.ExpenseCost
        });
    };

    // Function to handle changes inside the modal inputs
    const handleEditChange = (e) => {
        setEditExpense({
            ...editExpense,
            [e.target.name]: e.target.value
        });
    };

    // ✅ Update function with optimized API client
    const handleUpdate = async () => {
    try {
        await apiClient.put(`/api/update_expense/${editExpense.id}/`, editExpense);
        toast.success("Expense updated successfully!");
        apiClient.clearCache(); // ✅ Clear cache to get fresh data
        fetchExpenses(userId);
    } catch (error) {
        console.error("Update error:", error);
        toast.error("Failed to update expense");
    }
};

    // ✅ Delete logic with optimized API client
    const handleDelete = async (expenseId) => {
    if(window.confirm("Are you sure you want to delete this expense?")){
    try {
        await apiClient.delete(`/api/delete_expense/${expenseId}/`);
        toast.success("Expense deleted successfully!");
        apiClient.clearCache(); // ✅ Clear cache to get fresh data
        fetchExpenses(userId);
    }
    catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete expense");
    }
    
    } 
};

    return (
        <div className="container mt-5" style={{ maxWidth: "1200px" }}>
            <div className="text-center">
                <h2>
                    <i className="fas fa-receipt me-2"></i> Manage Expense
                </h2>
                <p className="text-muted">Track your expense</p>
            </div>

            {/* table section */}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Item</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length > 0 ? (
                            expenses.map((expense, index) => (
                                <tr key={expense.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{expense.ExpenseDate}</td>
                                    <td>{expense.ExpenseItem}</td>
                                    <td>${expense.ExpenseCost}</td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-primary me-2" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#exampleModal"
                                            onClick={() => handleEditClick(expense)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(expense.id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center text-muted" colSpan="5">
                                    <i className="fas fa-exclamation-circle"></i> No Expenses Found !!!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* bootstrap modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Expense</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="p-2">
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
                                            className="form-control"
                                            value={editExpense.ExpenseDate}
                                            onChange={handleEditChange}
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
                                            className="form-control"
                                            placeholder="What did you buy?"
                                            value={editExpense.ExpenseItem}
                                            onChange={handleEditChange}
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
                                            className="form-control"
                                            placeholder="0.00"
                                            step="0.01"
                                            value={editExpense.ExpenseCost}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={handleUpdate}
                                data-bs-dismiss="modal"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Manage_Expense;