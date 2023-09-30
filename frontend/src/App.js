import React from "react";
// import Header from "./Component/Header/Header";
import { Route, Routes } from "react-router-dom";
import Usersignup from "./Pages/Usersignup/Usersignup";
import UserLogin from "./Pages/Userlogin/Userlogin";
import Userhome from "./Pages/UserHomePage/Userhomepage";
import Otppage from "./Pages/Otppage/otppage";
import Adminlogin from "./Pages/AdminPages/AdminLogin/adminlogin";
import AdminPanel from "./Pages/AdminPages/AdminPanel/adminPanel";
import ForgotPassword from "./Pages/ForgotPassword/forgotPassword";
import ResetPassword from "./Pages/ResetPasswordPage/resetpassword";
import UserprofilePage from "./Pages/UserProfile/UserprofilePage";
import Categories from "./Pages/AdminPages/AdminCategories/Testcategories";
import Ownersdetails from "./Pages/AdminPages/OwnersDetails/Ownersdetails";
import Userdetails from "./Pages/AdminPages/UserDetails/Userdetails";
import TestDetails from "./Pages/AdminPages/AdminTestDetails/Testdetails";
import Centerdetailpage from "./Pages/AdminPages/CenterDetail/Centerdetailpage";
import Dashboard from "./Component/AdminsComponents/AdminDashboard/Dashboard";
import Centerhomepage from "./Pages/Centers/HomePage/CenterHomePage";
import Adminauth from "./Component/AdminsComponents/AdminAuth/Adminauth";
import AuthComponent from "./Component/AuthComponent/AuthComponent";
import Labregistration from './Pages/Centers/LabRegistration/Labregistration';
import Scanregistration from "./Pages/Centers/ScanRegistration/Scanregistration";
import Reapply from "./Pages/Centers/Stepper/Stepper";
import ListingPage from "./Pages/Centers/ListingPage/ListingPage";
import ScanDetailPage from "./Pages/Centers/ScanDetailPage/ScanDetailPage";
import UserRoutes from "./Component/Routes/userRoutes";
import CenterRoutes from "./Component/Routes/centerRoutes";
import Labdetails from './Pages/AdminPages/AdminLabDetails/LabList'
import LabDetailPage from './Pages/AdminPages/LabDetails/Labdetailpage'
import LabListingPage from "./Pages/Centers/LabListingPage/LabListingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Usersignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<Usersignup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/verifyotp" element={<Otppage />} />
        <Route path="/" element={<Userhome />} />

        <Route element={<UserRoutes />}>
          <Route path="/userprofile" element={<UserprofilePage />} />
          <Route path="/customer" element={<ListingPage />} />
          <Route path="/labcustomer" element={<LabListingPage />} />
          <Route path="/detailpage/:id" element={<ScanDetailPage />} />
        </Route>

        <Route element={<CenterRoutes />}>
          <Route path="/centerhomepage" element={<Centerhomepage />} />
          <Route path="/labregister" element={<Labregistration />} />
          <Route path="/scanregister" element={<Scanregistration />} />
          <Route path="/reapply" element={<Reapply />} />
        </Route>

        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route element={<Adminauth />}>
          <Route path="/adminpanel" element={<Dashboard />} />
          <Route path="/userdetails" element={<Userdetails />} />
          <Route path="/ownerdetails" element={<Ownersdetails />} />
          <Route path="/viewdetails/:id" element={<Centerdetailpage />} />
          <Route path="/admincategories" element={<Categories />} />
          <Route path="/CenterDetails" element={<TestDetails />} />
          <Route path="/labdetail" element={<Labdetails />} />
          <Route path="/labviewdetails/:id" element={<LabDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
