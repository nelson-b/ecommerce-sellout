import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPageComponent from "./components/error-page.component.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import PartnerComponent from "./components/partnerGroup/partner.component.js";
import HomeComponent from "./components/home/home.component.js";
import DataInputComponent from "./components/editorDataInput/parentInput.component.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DataReview from "./components/editorDataReview/dataReview.component.js";
import PartnerList from "./components/partnerList/partnerList.js";
import LoginComponent from "./components/login/login.component.js";
import DataReviewApprover from "./components/approverDataReview/dataReviewApprover.js";
import PartnerQuarterApprover from "./components/approverDataReview/previousQuarterReview.js";
import PartnerRequestList from "./components/partnerRequestList/partnerRequestList.js";
import AdminOverview from "./components/home/adminOverview.js";
import SuperUserOverview from "./components/home/superUserOverview.js";
import CreateUser from "./components/user/save/save.js";
import { roles } from "./components/constant.js";
import SaveUser from "./components/user/save/save.js";
import UserList from "./components/user/list/list.js";
import HistoricalData from "./components/historicalData/historicalData.js";
import BusinessUnitSplit from "./components/businessUnitSplit/buSplit.js";
import UserRequestComponent from "./components/user/userRequest.js";

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
          <Route path="/partner/list" element={<PartnerList />} />
          <Route path="/partner/requestList" element={<PartnerRequestList />} />

          <Route path="/editor/home" element={<HomeComponent role={roles.editor} />} />
          <Route path="/approver/home" element={<HomeComponent  role={roles.approver}/>} />
          <Route path="/superUser/home" element={<HomeComponent  role={roles.superApproverUser}/>} />
          <Route path="/admin/home" element={<AdminOverview role={roles.admin} />} />
          <Route path="/superUser" element={<SuperUserOverview />} />
          
          <Route path="/historicalData" element={<HistoricalData />} />
          <Route path="/buSplit" element={<BusinessUnitSplit />} />
          <Route path="*" element={<ErrorPageComponent />} />
          <Route path="/approverReview" element={<DataReviewApprover />} />
          <Route path="/partner/previousReview" element={<PartnerQuarterApprover />} />
          <Route path="/partner/create" element={<PartnerComponent showHigherLevelModule={false} module={'Create'}/>} />
          <Route path="/partner/update" element={<PartnerComponent showHigherLevelModule={true} module={'Update'}/>} />
          <Route path="higerLevelUser/partner/create" element={
              <PartnerComponent showHigherLevelModule={true} module={'Create'} />
          } />
          <Route path="higerLevelUser/partner/update" element={
              <PartnerComponent showHigherLevelModule={true} module={'Update'} />
          } />
          <Route path="/user/create" exact element={ <SaveUser module={'Create'} /> } />
          <Route path="/user/update" exact element={ <SaveUser module={'Update'} /> } />
          <Route path="/user/list" exact element={ <UserList /> } />
          <Route path="/user/Request" element={<UserRequestComponent />} />
          <Route path="/" element={ <LoginComponent/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
