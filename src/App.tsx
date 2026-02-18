import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Role from "./components/role";
import CreateRole from "./components/createRole";
const Loginpage = lazy(() => import("./pages/login"));
const ForgotPage = lazy(() => import("./pages/forgot"));
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
        <Route path="/login" element={<Loginpage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/reset-password" element={<ResetPage />} />
        <Route path="/roles" element={<Role />} />
        <Route path="/roles/create" element={<CreateRole/>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
