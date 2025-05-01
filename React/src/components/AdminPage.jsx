// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AdminPage = () => {
//   const [users, setUsers] = useState([]); // Danh sách người dùng
//   const navigate = useNavigate();

//   // Kiểm tra quyền truy cập Admin
//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     console.log(role);
//     if (role !== "admin") {
//       alert("Bạn không có quyền truy cập trang này!");
//       navigate("/");
//     } else {
//       fetchUsers(); // Lấy danh sách người dùng từ API
//     }
//   }, [navigate]);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/admin/users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response.data);  // Debug để kiểm tra dữ liệu trả về
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Lỗi khi lấy danh sách người dùng:", error.response?.data || error.message);
//     }
//   };
  

//   return (

//     <div className="container mt-5">
//     <h1 className="text-center">Danh Sách Người Dùng Đã Đăng Ký</h1>
//     <table className="table table-striped mt-3">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Tên Đăng Nhập</th>
//           <th>Họ và Tên</th>
//           <th>Email</th>
//           <th>Số Điện Thoại</th>
//           <th>Địa Chỉ</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user.id}>
//             <td>{user.id}</td>
//             <td>{user.username}</td>
//             <td>{user.fullname}</td>
//             <td>{user.email}</td>
//             <td>{user.phone}</td>
//             <td>{user.address}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//   );
// };

// export default AdminPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/AdminPage.css"

const AdminPage = () => {
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const navigate = useNavigate();

  // Kiểm tra quyền truy cập Admin
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Bạn không có quyền truy cập trang này!");
      navigate("/");
    } else {
      fetchUsers(); // Lấy danh sách người dùng từ API
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error.response?.data || error.message);
    }
  };

  // Hàm cập nhật vai trò người dùng
  const updateRole = async (userId, newRole) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.post(
  //       "http://localhost:5000/admin/update-role",
  //       { userId, role: newRole },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // Cập nhật role trên giao diện
  //     setUsers((prevUsers) =>
  //       prevUsers.map((user) =>
  //         user.id === userId ? { ...user, role: newRole } : user
  //       )
  //     );

  //     alert(`Cập nhật vai trò thành công cho người dùng ${userId}`);
  //   } catch (error) {
  //     console.error("Lỗi khi cập nhật vai trò:", error.response?.data || error.message);
  //     alert("Không thể cập nhật vai trò. Vui lòng thử lại.");
  //   }
  // };

  // Hàm cập nhật vai trò người dùng
  const updateRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/admin/update-role",
        { userId, role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Cập nhật role trên giao diện
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      alert(`Cập nhật vai trò thành công cho người dùng ${userId}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật vai trò:", error.response?.data || error.message);
      alert("Không thể cập nhật vai trò. Vui lòng thử lại.");
    }
  };
};

  return (
    <div className="container mt-5">
      <h1 className="text-center">Danh Sách Người Dùng Đã Đăng Ký</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Đăng Nhập</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Số Điện Thoại</th>
            <th>Địa Chỉ</th>
            <th>Vai Trò</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>
                {user.role === "admin" ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => updateRole(user.id, "user")}
                  >
                    Đổi thành User
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => updateRole(user.id, "admin")}
                  >
                    Đổi thành Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
