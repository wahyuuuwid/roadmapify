import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import Tentang from "./pages/Tentang";
import Kontak from "./pages/Kontak";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import PusatBantuan from "./pages/HelpCenter";

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

      {/* 404 not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;