import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import Tentang from "./pages/Tentang";
import Kontak from "./pages/Kontak";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import PusatBantuan from "./pages/HelpCenter";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/account/Dashboard";
import Profile from "./pages/account/Profile";
import { AuthOnly, GuestOnly } from "./guards";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roadmap/:id" element={<Detail />} />
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/kontak" element={<Kontak />} />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsConditions />} />
      <Route path="/pusat-bantuan" element={<PusatBantuan />} />

      <Route path="/auth/login" element={ 
        <GuestOnly>
          <Login />
        </GuestOnly>
      } />
      <Route path="/auth/register" element={
        <GuestOnly>
          <Register />
        </GuestOnly>
      } />

      <Route path="/akun/dashboard" element={
        < AuthOnly>
          <Dashboard />
        </AuthOnly>
      } />
      <Route path="/akun/profile" element={<Profile />} />

      {/* 404 not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;