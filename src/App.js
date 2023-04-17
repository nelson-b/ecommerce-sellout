import React, { useState } from "react";
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddSelloutdata from "./components/add-selloutdata.component.js";
import MyMenu from "./components/menu.component.js";
import HomeComponent from "./components/home.component.js";
import { createBrowserHistory as createHistory } from "history";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const history = createHistory();

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

const MissingPage = () => <h1>404</h1>

  return (
    <div className="App">
      <Router history = {history}>
        <MyMenu/>
        <Routes>
          <Route path="/" exact element={ <HomeComponent/> } />
          <Route path="/add" exact element={ <AddSelloutdata/> } />
          <Route MissingPage element={<MissingPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;