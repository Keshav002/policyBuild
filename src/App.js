import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//import Nav from "./components/Nav"

//import Consultant from "./pages/Consultant"; // Import your Home component
import SignUp from "./pages/Signup";
import Consultant from "./pages/Consultant";
import ForgotPass from "./pages/ForgotPass";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";

function App() {
  return (
    <>
    
    <Router>
        <Routes>
        <Route path="/signup" element={<SignUp/>} />       
        <Route path="/consultant" element={<Consultant/>} />       
        <Route path="/forgot-password" element={<ForgotPass/>} />       
        <Route path="/reset-password" element={<ResetPassword/>} />       
        <Route path="/login" element={<Login/>} />       
        </Routes>
    </Router>
    </>
  );
}

export default App;
