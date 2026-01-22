import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MenuPage from "./pages/MenuPage";
import StaffPage from "./pages/StaffPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/staff" element={<StaffPage />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
