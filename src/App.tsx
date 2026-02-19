import { Routes, Route,Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import DashboardHome from "./layout/dashboardlayout";
import Adminlayout from "./layout/adminLayout";


const Loginpage = lazy(() => import("./pages/login"));
const ForgetPage = lazy(() => import("./pages/forget"));
const ResetPage = lazy(() => import("./pages/reset"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      }
    >
      <Routes>
         <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/dashboard' element={<DashboardHome/> }/>
        <Route path='/dashboard/admin' element={<Adminlayout/>}/>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/forgot-password" element={<ForgetPage />} />
        <Route path="/reset-password" element={<ResetPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
