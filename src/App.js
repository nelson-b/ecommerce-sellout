import React, { useState } from "react";
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from "./components/login/login.component.js";
import ErrorPageComponent from "./components/error-page.component.js";
import HomeComponent from "./components/home.component.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={ <LoginComponent/> } />
          <Route path="/" element={ <HomeComponent/> } />
          <Route path="*" element={ <ErrorPageComponent/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;