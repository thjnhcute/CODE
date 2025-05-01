import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ProductCard.css"; // CSS cho sản phẩm
import "../css/Home.css"; // CSS tùy chỉnh cho trang chủ
import { useNavigate } from "react-router-dom";
import ProductCards from "./ProductCard"; // Giao diện sản phẩm
const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Dữ liệu sản phẩm

  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(null); // Lỗi

  // Lấy token từ localStorage
  const token = localStorage.getItem('token');

  // Lấy dữ liệu sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products/products", {
        headers: {
          Authorization: `Bearer ${token}`  // Gửi token trong header
        }
      });
      console.log("Dữ liệu sản phẩm:", response.data);
      setProducts(response.data);
      // console.log("Dữ liệu sản phẩm:", response.data);
    }
    catch (err) {
      console.error("Lỗi API:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();

  }, [token]); // Thêm token vào dependency array nếu cần

  return (
    <div className="home-page">

      <div className="banner">
        <h1>Chào mừng đến với Tigon Milk Tea & Coffee</h1>
        <p>Khám phá những sản phẩm nước chất lượng cao, tươi mát mỗi ngày!</p>
      </div>
      <div className="promo-banner">
        <div className="promo-banner-content">
          <h2>Khuyến mãi cực lớn!</h2>
          <p>Giảm giá lên đến <span className="highlight">50%</span> cho tất cả các loại nước trái cây tươi.</p>
          <button className="promo-button" onClick={() => navigate('/promotions')}>
            Xem chi tiết
          </button>
        </div>
        <div className="promo-banner-image">
          <img src="/images/juice-promo.jpg" alt="Khuyến mãi nước trái cây" />
        </div>
      </div>
      {/* Phần banner */}
      <h5
        onClick={() => navigate('/productcard')} // Điều hướng tới trang danh sách sản phẩm
        style={{ cursor: "pointer", color: "#333333", textDecoration: "underline" }}
      >
        Danh sách sản phẩm
      </h5>

      {/* Hiển thị trạng thái tải hoặc lỗi */}
      {loading && (
        <p style={{ textAlign: "center", fontStyle: "italic", color: "#777" }}>
          Đang tải dữ liệu sản phẩm...
        </p>
      )}
      {error && (
        <p style={{ textAlign: "center", fontWeight: "bold", color: "red" }}>
          {error}
        </p>
      )}

      {/* Danh sách sản phẩm */}
      <ProductCards /> {/* Chèn giao diện danh sách sản phẩm */}
    </div>
  );
};

export default HomePage;
