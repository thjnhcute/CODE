import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AdminOrders.css"


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally { 
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  console.log(AdminOrders);
  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center">Danh Sách Đơn Hàng</h1>
      <table  className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID Đơn Hàng</th>
            <th>ID Người Dùng</th>
            <th>Ngày Tạo</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((donhang) => (
            <tr key={donhang.iddathang}>
              <td>{donhang.iddathang}</td>
              <td>{donhang.iduser}</td>
              <td>{new Date(donhang.ngaydh).toLocaleString()}</td>
              <td>{donhang.trangthai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
