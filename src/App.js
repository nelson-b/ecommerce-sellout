import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPageComponent from "./components/error-page.component.js";
import PartnerComponent from "./components/partner.component.js";
import HomeComponent from "./components/home.component.js";
import DataInputComponent from "./components/dataInput/parentInput.component.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DataReview from "./components/dataReview/dataReview.component.js";
import LoginComponent from "./components/login/login.component.js";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dataInput" element={<DataInputComponent />} />
          <Route path="/dataReview" element={<DataReview />} />
          <Route path="/" element={<HomeComponent />} />
          <Route path="*" element={<ErrorPageComponent />} />
          <Route path="/addPartner" exact element={<PartnerComponent isCreatedModule={true} />} />
          <Route path="/updatePartner" exact element={<PartnerComponent isCreatedModule={false}/>} />
          <Route path="/login" element={ <LoginComponent/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
