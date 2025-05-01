import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [user, setUser] = useState({
    fullname: "",
    phone: "",
    address: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Bạn cần đăng nhập để truy cập trang này.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/profile/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Dữ liệu từ API:", response.data); // Kiểm tra dữ liệu trả về
        setUser(response.data.user);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setMessage("Không thể tải thông tin người dùng.");
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3000/profile", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      setMessage("Cập nhật thông tin thất bại.");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Cập nhật thông tin cá nhân</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Họ và tên
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            value={user.fullname || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={user.address || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cập nhật thông tin
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={() => navigate("/dashboard")}
        >
          Quay lại
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
