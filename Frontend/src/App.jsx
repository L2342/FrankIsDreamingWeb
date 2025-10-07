import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SubscribePage from "./pages/suscribePage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<SubscribePage />} />
      </Routes>
    </Router>
  );
}
