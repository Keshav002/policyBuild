import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
//import Consultant from "./pages/Consultant"; // Import your Home component
import SignUp from "./pages/Signup";
import Consultant from "./pages/Consultant";
import CompanyList from "./pages/CompanyList";
import ConsultantList from "./pages/ConsultantList";
import CompanyProfile from "./pages/CompanyProfile";
import PolicyList from "./pages/PolicyList";
import ConsultantProfile from "./pages/ConsultantProfile";
import ForgotPass from "./pages/ForgotPass";
import ResetPassword from "./pages/ResetPassword";
import ConsultantProjects from "./pages/ConsultantProjects";
import CompanyProjects from "./pages/CompanyProjects";
import Login from "./pages/Login";
import Repository from "./pages/Repository";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Meetings from "./pages/Meetings";

import {Provider} from "react-redux";
import store from "./store/store";
import { DataTable } from "./components/DataTable";
import NewCard from "./components/NewCard";
import UserDataPersistence from "./components/UserDataPersistence";
import PdfViewer from "./components/PdfViewer";
import CompanyPdfViewer from "./components/CompanyPdfViewer";
import SimpleTable from "./components/Table";
function App() {
  return (
    <>
    
      <Provider store={store}>
        <Router>
          <UserDataPersistence />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/consultant" element={<Consultant />} />
            <Route path="/company-list" element={<CompanyList />} />
            <Route path="/consultant-list" element={<ConsultantList />} />
            <Route path="/company-profile/:id" element={<CompanyProfile />} />
            <Route path="/consultant-profile/:id" element={<ConsultantProfile />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/consultant-projects" element={<ConsultantProjects />} />
            <Route path="/company-projects" element={<CompanyProjects />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/repository" element={<Repository />} />
            <Route path="/" element={<Login />} />
            <Route path= "/datatable" element={<DataTable />} />
            <Route path= "/pdf" element={<PdfViewer />} />
            <Route path= "/policy-list" element={<PolicyList />} />
            <Route path= "/newcard" element={<NewCard />} />
            <Route path="/consultant-projects/:projectId/policy-list" element={<PolicyList />} />
            <Route path="/company-projects/:projectId/policy-list/:policyId/pdf" element={<CompanyPdfViewer />} />
            <Route path="/consultant-projects/:projectId/policy-list/:policyId/pdf" element={<PdfViewer />} />
            <Route path= "/company-projects/:projectId/policy-list" element={<PolicyList />} />
            <Route path="/table" element={<SimpleTable />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;