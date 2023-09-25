import React from "react";
import './App.css';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import AdminEmployee from './components/AdminEmployee.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import BookVenue from './components/BookVenue';
import EmployeeVenueSelection from "./components/Employee_dashboard";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<AdminEmployee/>} />
      <Route path="/Signup" element={<Signup/>}></Route>
      <Route path="employee/dashboard" element={<EmployeeVenueSelection/>}></Route>
      <Route path="/Login" element={<Login/>}/>
      <Route path="Admin/Dashboard" element={<BookVenue/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
