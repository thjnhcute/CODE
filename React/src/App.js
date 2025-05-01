import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "../src/pages/RegisterPage";
import LoginPage from "../src/pages/LoginPage";
import PromotionsPage from "./components/PromotionsPage";
// import LogoutPage from "../src/pages/LogoutPage";
import UpdateProfile from "./components/UpdateProfile";
import HomePage from "./components/HomePage";
import UserDashboard from "./components/UserDashboard";
import AdminPage from "./components/AdminPage";
import AdminOrders from "./components/AdminOrders";
import AdminProductsManager from "./components/AdminnProductsManager";


// import CartPage from "./pages/CartPage";
import Chitietsanpham from "./components/Chitietsanpham";
import ProductCard from "./components/ProductCard";
import Banner from "./components/Banner";
import GioHang from "./components/Giohang";
// import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/profile/dashboard" element={<UserDashboard />} />
        <Route path="/giohang" element={<GioHang />} /> 
        <Route path="/donhang/create" element={<GioHang />} /> 
        <Route path="/payment/link" element={<GioHang />} /> 
        <Route path="/products/products/:idsanpham" element={<Chitietsanpham/>}/>
        <Route path="/productcard" element={<ProductCard />} />
        <Route path="/banner" element={<Banner />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/products" element={<AdminProductsManager />} />
        <Route path="/admin/categories" element={<AdminProductsManager />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
