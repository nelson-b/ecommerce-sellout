import React from "react";
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PerformanceOverview from "./performanceOverview.component.js";
import MyMenu from "./components/menu.component.js";
import ErrorPage from "./error-page.component.js"

function RoutePage(){
  return (
    <div className="App">
      <Router history = {history}>
        <MyMenu/>
        <Routes>
          <Route path="/" exact element={ <PerformanceOverview/> } />
          <Route path="*" element={ <ErrorPage/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default RoutePage;