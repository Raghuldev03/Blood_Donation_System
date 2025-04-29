import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Charity from "./pages/Charity";
import Donar from "./pages/Donar";
import Signup from "./pages/donar/Signup";
import ForgetPassword from "./pages/donar/donarforgetpassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DonarDashboard from "./pages/donar/DonarDashboard";
import Charitydashboard from "./pages/charity/Charitydashboard";
import AdminProtectedRoute from "./routes/Adminprotectedroute";
import DonarProtectedRoute from "./routes/Donarprotectedroute";
import CharityProtectedRoute from "./routes/Chairtyprotectedroute";
import React from "react";
import ViewDonar from "./pages/admin/DonarManage";
import VaultRequest from "./pages/admin/VaultRequest";
import BloodSignup from "./pages/charity/signup";
import BloodbankManage from "./pages/admin/BloodbankManage";
import CreateBloodDonationCampaign from "./pages/charity/CreateBloodDonationCampaign";
import Campainrequest from "./pages/admin/Campainrequest";
import ViewCampain from "./pages/charity/Viewcampain";
import Request from "./pages/charity/Request";
import Bloodunit from "./pages/charity/Bloodunit";
import Quantityupdate from "./pages/admin/QuantityUpdate";
import Report from "./pages/admin/Report";
import Viewrequest from "./pages/donar/viewrequest";
import ViewCampains from "./pages/donar/ViewCampains";
import DonationPage from "./pages/donar/Donation";
import Donationrequest from "./pages/admin/Donationrequest";
import Generatecertificate from "./pages/donar/generatecertificate";

function AppLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/donar/forgetpassword"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/vault" element={<Charity />} />
        <Route path="/donar" element={<Donar />} />
        <Route path="/donar/signup" element={<Signup />} />
        <Route path="/donar/forgetpassword" element={<ForgetPassword />} />
        <Route path="/admin/vaultrequest" element={<VaultRequest />} />
        <Route path="/vault/signup" element={<BloodSignup />} />
        <Route path="/admin/bloodbankmanage" element={<BloodbankManage />} />
        <Route path="/admin/donarmanage" element={<ViewDonar />} />
        <Route path="/admin/campainrequest" element={<Campainrequest />} />
        <Route path="/valut/Viewcampain" element={<ViewCampain />}></Route>
        <Route path="/valut/history" element={<Request />} />
        <Route path="/valut/bloodunit" element={<Bloodunit />} />
        <Route path="/admin/quantityupdate" element={<Quantityupdate />} />
        <Route path="/admin/report" element={<Report />} />
        <Route path="/donar/viewbloodrequest" element={<Viewrequest />} />
        <Route path="/donar/viewcampain" element={<ViewCampains />} />
        <Route path="/donar/donation" element={<DonationPage />} />
        <Route path="/admin/donationapprove" element={<Donationrequest />} />
        <Route path="/donar/certificate" element={<Generatecertificate />} />

        <Route
          path="/valut/createcampaign"
          element={<CreateBloodDonationCampaign />}
        />
        <Route
          path="/admin/donardashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/donar/dashboard"
          element={
            <DonarProtectedRoute>
              <DonarDashboard />
            </DonarProtectedRoute>
          }
        />
        <Route
          path="/valut/dashboard"
          element={
            <CharityProtectedRoute>
              <Charitydashboard />
            </CharityProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
