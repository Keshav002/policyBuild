import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//import Nav from "./components/Nav"

//import Consultant from "./pages/Consultant"; // Import your Home component
import SignUp from "./pages/Signup";

function App() {
  return (
    <>
    
    <Router>
        <Routes>
        <Route path="/" element={<SignUp/>} />
        
        </Routes>
    </Router>
    </>
  );
}

export default App;
