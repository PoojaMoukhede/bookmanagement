import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ContactUS from "./pages/ContactUS";
import ProductDashboard from "./pages/ProductDashboard";
import { APIContextProvider } from "./Context";

function App() {
  // Function to check if the user is logged in
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if the token exists
  };

  return (
    <BrowserRouter>
      <APIContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route
            path="/products"
            element={
              isAuthenticated() ? (
                <ProductDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </APIContextProvider>
    </BrowserRouter>
  );
}

export default App;
