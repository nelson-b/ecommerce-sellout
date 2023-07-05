import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Redirect } from "react-router-dom";
import ErrorPageComponent from "./components/error-page.component.js";
import "bootstrap/dist/css/bootstrap.min.css";
import PartnerComponent from "./components/partnerGroup/partner.component.js";
import HomeComponent from "./components/home/home.component.js";
import DataInputComponent from "./components/editorDataInput/parentInput.component.js";
import "./App.css";
import DataReview from "./components/editorDataReview/dataReview.component.js";
import PartnerList from "./components/partnerList/partnerList.js";
import LoginComponent from "./components/login/login.component.js";
import TesterLoginComponent from "./components/login/login.tester.component.js";
import DataReviewApprover from "./components/approverDataReview/dataReviewApprover.js";
import PartnerQuarterApprover from "./components/approverDataReview/previousQuarterReview.js";
import PartnerRequestList from "./components/partnerRequestList/partnerRequestList.js";
import AdminOverview from "./components/home/adminOverview.js";
import SuperUserOverview from "./components/home/superUserOverview.js";
import { roles } from "./components/constant.js";
import SaveUser from "./components/user/save/save.js";
import UserList from "./components/user/list/list.js";
import HistoricalData from "./components/historicalData/historicalData.js";
import BusinessUnitSplit from "./components/businessUnitSplit/buSplit.js";
import UserRequestComponent from "./components/user/userRequest.js";
import InputCalender from "./components/admin/inputCalender.js";
//history
import { history } from "./helper/history.js";
// import RouteGuard from "./RouteGuard.js";
import Authenticate from "./components/login/authenticate.component.js";
import AuthLayout from "./AuthLayout.js";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  let data = {
    body: {}
  }

  return (
    <div className="App">
      <Router history={history}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/dataInput" element={<DataInputComponent />} />
            <Route path="/dataReview" element={<DataReview />} />
            <Route path="/partner/list" element={<PartnerList />} />
            <Route path="/partner/requestList" element={<PartnerRequestList />} />
            <Route
              path="/editor/home"
              element={<HomeComponent role={roles.editor} />}
            />
            <Route
              path="/approver_1/home"
              element={<HomeComponent role={roles.approve_1} />}
            />
            <Route
              path="/approver_2/home"
              element={<HomeComponent role={roles.approver_2} />}
            />
            <Route
              path="/superApproverUser/home"
              element={<HomeComponent role={roles.supervisor_approv_1_2} />}
            />
            <Route
              path="/admin/home"
              element={<AdminOverview role={roles.admin} />}
            />
            <Route path="/superUser" element={<SuperUserOverview />} />

            <Route
              path="/admin/inputCalendar"
              exact
              element={<InputCalender />}
            />

            <Route path="/historicalData" element={<HistoricalData />} />
            <Route path="/buSplit" element={<BusinessUnitSplit />} />
            <Route path="*" element={<ErrorPageComponent />} />
            <Route path="/approverReview" element={<DataReviewApprover />} />
            <Route
              path="/partner/previousReview"
              element={<PartnerQuarterApprover />}
            />
            <Route
              path="/partner/create"
              element={
                <PartnerComponent
                  showHigherLevelModule={false}
                  module={"Create"}
                />
              }
            />
            <Route
              path="/partner/update"
              element={
                <PartnerComponent
                  showHigherLevelModule={true}
                  module={"Update"}
                />
              }
            />
            <Route
              path="higerLevelUser/partner/create"
              element={
                <PartnerComponent
                  showHigherLevelModule={true}
                  module={"Create"}
                />
              }
            />
            <Route
              path="higerLevelUser/partner/update"
              element={
                <PartnerComponent
                  showHigherLevelModule={true}
                  module={"Update"}
                />
              }
            />
            <Route
              path="/user/create"
              exact
              element={<SaveUser module={"Create"} />}
            />
            <Route
              path="/user/update"
              exact
              element={<SaveUser module={"Update"} />}
            />
            <Route path="/user/list" exact element={<UserList />} />
            <Route path="/user/Request" element={<UserRequestComponent />} />
          </Route>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/testerLogin" element={<TesterLoginComponent />} />
          <Route path="/authenticate" element = {<Authenticate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;