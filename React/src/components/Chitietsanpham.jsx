import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams và useNavigate
import '../css/ChitietStyle.css'; // Import CSS

const ProductDetail = () => {
  const { idsanpham } = useParams(); // Lấy id sản phẩm từ URL
  const [sanpham, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); // Giỏ hàng
  const navigate = useNavigate(); // Hook để điều hướng người dùng
  const style = [
    {
      display:'flex',

    }
  ]
  // Lấy token từ localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/products/${idsanpham}`, {
          headers: {
            Authorization: `Bearer ${token}`  // Thêm token vào header nếu có
          }
        });
        setProduct(response.data); // Lưu dữ liệu vào state
      } catch (err) {
        console.error("Error fetching product:", err.message);
        setError(err.message); // Lưu lỗi vào state nếu có
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    if (idsanpham) {
      fetchProduct();
    }
  }, [idsanpham, token]);

  const handleAddToCart = async (sanpham) => {
    if (!token) {
      // Nếu chưa đăng nhập, yêu cầu người dùng đăng nhập
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      navigate('/login');  // Điều hướng đến trang đăng nhập (có thể thay đổi URL này tùy vào cấu trúc của bạn)
      return;
    }

    try {
      const existingProduct = cart.find((item) => item.idsanpham === sanpham.idsanpham);

      if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, chỉ cập nhật số lượng trên state
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.idsanpham === sanpham.idsanpham ? { ...item, soluongsp: item.soluongsp + 1 } : item
          )
        );
        alert(`Đã cập nhật số lượng ${sanpham.tensanpham} trong giỏ hàng!`);
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        const response = await axios.post("http://localhost:5000/giohang/giohang/add", {
          gia: sanpham.gia,
          idsanpham: sanpham.idsanpham,
          soluongsp: 1,
          tensanpham: sanpham.tensanpham,
        }, {
          headers: {
            Authorization: `Bearer ${token}`  // Thêm token vào header khi thêm vào giỏ hàng
          }
        });

        if (response.status === 200) {
          setCart((prevCart) => [...prevCart, { ...sanpham, soluongsp: 1 }]);
          alert(`Đã thêm ${sanpham.tensanpham} vào giỏ hàng!`);
        }
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  // Trả về giao diện người dùng (UI) dựa trên trạng thái
  if (loading) {
    return <p className="loading">Đang tải sản phẩm...</p>;
  }

  if (error) {
    return <p className="error">Lỗi: {error}</p>;
  }

  if (!sanpham) {
    return <p className="not-found">Sản phẩm không tồn tại.</p>;
  }

  // Hiển thị chi tiết sản phẩm
  return (
    <div style={style.display} className="product-detail-container">
      <div className="product-image">
        <img src={`http://localhost:5000/hinhanh/${sanpham.hinhanh}`} alt={sanpham.tensanpham} />
      </div>
      <div className="product-info">
        <h1>{sanpham.tensanpham}</h1>
        <p>{sanpham.mota}</p>
        <p className="product-price">Giá: {sanpham.gia} VNĐ</p>
        <button
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(sanpham)}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
