import HomePage from "./pages/HomePage";
import LogingPage from "./pages/LogingPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import LoginRequired from "./utils/LoginRequired";
import RegisterPage from "./pages/RegisterPage";
import SellProductsPage from "./pages/VendorPage";
import ProductListPage from "./pages/ProductListPage";
import Dashboard from "./pages/dashboard";

import UserProfilePage from "./pages/settings";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LogingPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<LoginRequired />}>
              <Route path="/" element={<HomePage />} exact />
              <Route path="/sell" element={<SellProductsPage />} />
              <Route path="/ListProduct" element={<ProductListPage />} />
              <Route path="/settings" element={<UserProfilePage />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
