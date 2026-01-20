import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MenuPage from "./pages/MenuPage";
import StaffPage from "./pages/StaffPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/staff" element={<StaffPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
