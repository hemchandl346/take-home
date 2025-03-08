import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Search from "./pages/SearchPage";
import { useState } from "react";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );
  
  const handleAuth = (authState) => {
    localStorage.setItem("isAuthenticated", authState);
    setIsAuthenticated(authState);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={handleAuth} />} />
        <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
