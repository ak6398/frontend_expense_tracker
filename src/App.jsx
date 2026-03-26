import './App.css'
import Signup from './components/Signup';
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import Manage_Expense from './components/ManageExpense';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Index/>} />
          <Route path='/home' element={<Index/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/add-expense' element={<AddExpense/>} />
          <Route path='/manage_expense' element={<Manage_Expense/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
