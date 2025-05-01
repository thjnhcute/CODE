import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {   
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    
    
    // Kiểm tra xem có token không
    if (!token) {
      setError("Bạn cần đăng nhập để xem thông tin.");
      setLoading(false);
      return; 
    }

    // Gửi yêu cầu đến API để lấy thông tin người dùng
    axios
      .get("http://localhost:5000/profile/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response data:", response.data);  // Kiểm tra dữ liệu API trả về
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response || error.message);
        
        // Xử lý lỗi từ API
        if (error.response && error.response.status === 401) {
          setError("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
          localStorage.removeItem("token"); // Xóa token nếu hết hạn
        } else {
          setError("Không tải được thông tin người dùng.");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2>Thông tin người dùng</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Tên đăng nhập</th>
            <td>{user.username}</td>
          </tr>
          <tr>
            <th>Họ tên</th>
            <td>{user.fullname}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Số điện thoại</th>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <th>Địa chỉ</th>
            <td>{user.address}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => navigate("/profile")}>
        Cập nhật thông tin
      </button>
    </div>
  );
};

export default UserDashboard;
