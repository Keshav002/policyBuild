import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
//import Nav from "./components/Nav"

//import Consultant from "./pages/Consultant"; // Import your Home component
import SignUp from "./pages/Signup";
import Consultant from "./pages/Consultant";
import CompanyList from "./pages/CompanyList";
import CompanyProfile from "./pages/CompanyProfile";
import ConsultantProfile from "./pages/ConsultantProfile";
import ForgotPass from "./pages/ForgotPass";
import ResetPassword from "./pages/ResetPassword";
import ConsultantProjects from "./pages/ConsultantProjects";
import Login from "./pages/Login";
import {Provider} from "react-redux";
import store from "./store/store";
import { DataTable } from "./components/DataTable";
import UserDataPersistence from "./components/UserDataPersistence";
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
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="/consultant-profile" element={<ConsultantProfile />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/consultant-projects" element={<ConsultantProjects />} />
            <Route path="/login" element={<Login />} />
            <Route path= "/datatable" element={<DataTable />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
