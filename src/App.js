import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "./components/login/login.component.js";
import ErrorPageComponent from "./components/error-page.component.js";
import HomeComponent from "./components/home.component.js";
import SellOutInputComponent from "./components/dataInput/sellOutInput.component.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DataReview from "./components/dataReview/dataReview.component.js";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/dataInput" element={<SellOutInputComponent />} />
          <Route path="/dataReview" element={<DataReview />} />
          <Route path="/" element={<HomeComponent />} />
          <Route path="*" element={<ErrorPageComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
