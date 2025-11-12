import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MenuPage from "./pages/MenuPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;
