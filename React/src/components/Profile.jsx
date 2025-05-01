// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../css/Profile.css"

// const Profile = () => {
//     const [userData, setUserData] = useState(null); // Dữ liệu người dùng
//     const [loading, setLoading] = useState(true);  // Trạng thái tải
//     const [error, setError] = useState(null); // Lỗi

//     // Lấy dữ liệu người dùng khi component mount
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = localStorage.getItem("token");    
//                 console.log(token)
//                 const response = await axios.get("http://localhost:5000/profile",{
//                     headers: {
//                       Authorization: `Bearer ${token}`,
//                     },
//                   }); // API lấy thông tin người dùng
//                 setUserData(response.data); // Lưu dữ liệu vào state
//             } catch (err) {
//                 setError(err.message); // Xử lý lỗi
//             } finally {
//                 setLoading(false); // Tắt trạng thái loading
//             }
//         };

//         fetchUserData();
//     }, []);

//     if (loading) {
//         return <p>Đang tải dữ liệu...</p>;
//     }

//     if (error) {
//         return <p style={{ color: "red" }}>{error}</p>;
//     }

//     return (
//         <div className="profile-container">
//         <div className="profile-card">
//             <h1 className="profile-title">Thông tin người dùng</h1>
//             {userData ? (
//                 <div className="profile-info">
//                     <p><strong>Họ tên:</strong> {userData.fullname}</p>
//                     <p><strong>Email:</strong> {userData.email}</p>
//                     <p><strong>Số điện thoại:</strong> {userData.phone}</p>
//                     <p><strong>Địa chỉ:</strong> {userData.address}</p>
//                     <p><strong>Chức năng:</strong>{userData.role}</p>
//                 </div>
//             ) : (
//                 <p className="profile-error">Không tìm thấy thông tin người dùng</p>
//             )}
//         </div>
//     </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null); // Dữ liệu người dùng
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(null); // Lỗi
  const [editing, setEditing] = useState(false); // Trạng thái chỉnh sửa
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  }); // Dữ liệu form chỉnh sửa

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setFormData({
          fullname: response.data.fullname,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setFormData({
      fullname: userData.fullname,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/profile/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditing(false);
      setUserData(formData);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Thông tin người dùng</h1>
        {editing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-form-field">
              <label>Họ tên:</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="profile-form-field">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="profile-form-field">
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="profile-form-field">
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="profile-form-buttons">
              <button type="submit">Lưu thay đổi</button>
              <button type="button" onClick={handleCancelClick}>
                Hủy
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <p>
              <strong>Họ tên:</strong> {userData.fullname}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {userData.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {userData.address}
            </p>
            <p>
              <strong>Chức năng:</strong> {userData.role}
            </p>
            <button onClick={handleEditClick}>Chỉnh sửa</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
