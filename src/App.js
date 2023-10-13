import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Nav from "./components/Nav"

import Consultant from "./pages/Consultant"; // Import your Home component


function App() {
  return (
    <>
    <Nav/>
    <Router>
        <Routes>
        <Route path="/" element={<Consultant />} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
