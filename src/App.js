import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PartnerComponent from "./components/partner.component.js";
import MyMenu from "./components/menu.component.js";
import HomeComponent from "./components/home.component.js";
import { createBrowserHistory as createHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const history = createHistory();

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const MissingPage = () => <h1>404 - Page not found</h1>;

  return (
    <div className="App">
      <Router history={history}>
        <MyMenu />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/addPartner" exact element={<PartnerComponent />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
