import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/DashBoard";
import ForgotPassword from "./components/ForgotPassword";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path="/login" element={<Login/>} />
      <Route path="/" element={<Dashboard/>} />
      <Route element={<ErrorMessage/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes> 
    </Router>
    
    </div>
  );
}

export default App;
