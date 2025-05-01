import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/cartStyles.css";
import { useNavigate } from "react-router-dom";

const GioHang = () => {
  const [cart, setCart] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [bankLinked, setBankLinked] = useState(false); 
  const [momoLinked, setMomoLinked] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      try {
        const response = await axios.get("http://localhost:5000/giohang/giohang", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Hàm tăng số lượng (cập nhật trên server và client)
  const increaseQuantity = async (idsanpham) => {
    try {
      const updatedItem = cart.find((item) => item.idsanpham === idsanpham);
      updatedItem.soluongsp += 1;

      await axios.post("http://localhost:5000/giohang/update", {
        idsanpham: idsanpham,
        soluongsp: updatedItem.soluongsp,
      });

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.idsanpham === idsanpham ? { ...item, soluongsp: updatedItem.soluongsp } : item
        )
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật số lượng:", err.message);
    }
  };

  // Hàm giảm số lượng (cập nhật trên server và client)
  const decreaseQuantity = async (idsanpham) => {
    try {
      const updatedItem = cart.find((item) => item.idsanpham === idsanpham);
      if (updatedItem.soluongsp > 1) {
        updatedItem.soluongsp -= 1;

        await axios.post("http://localhost:5000/giohang/update", {
          idsanpham: idsanpham,
          soluongsp: updatedItem.soluongsp,
        });

        setCart((prevCart) =>
          prevCart.map((item) =>
            item.idsanpham === idsanpham ? { ...item, soluongsp: updatedItem.soluongsp } : item
          )
        );
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật số lượng:", err.message);
    }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = async (idsanpham) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Không có token, vui lòng đăng nhập.');
        navigate("/login");
        return;
      }
      await axios.post(
        "http://localhost:5000/giohang/remove",
        { idsanpham },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart((prevCart) => prevCart.filter((item) => item.idsanpham !== idsanpham));
    } catch (err) {
      console.error('Lỗi khi xóa sản phẩm:', err.message);
    }
  };



const handlePlaceOrder = async () => {
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          alert("Vui lòng đăng nhập để đặt hàng.");
          navigate("/login");
          return;
      }

      if (paymentMethod === "bank_transfer" && !bankLinked && !momoLinked) {
          alert("Vui lòng liên kết ngân hàng hoặc ví MoMo để tiếp tục.");
          return;
      }

      const response = await axios.post(
          "http://localhost:5000/donhang/create",
          { cart, paymentMethod, bankLinked, momoLinked },
          { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = response.data;

      if (response.status === 200) {
          alert(data.message);
          setCart([]);
      } else {
          alert(data.message || "Đặt hàng thất bại. Vui lòng thử lại.");
      }
  } catch (err) {
      console.error("Lỗi khi đặt hàng:", err.message);
      alert("Đặt hàng thất bại. Vui lòng thử lại.");
  }
};
  


  // Tính tổng giá trị giỏ hàng
  const total = cart.reduce((sum, item) => sum + item.gia * item.soluongsp, 0);

  // Hiển thị trạng thái tải và lỗi
  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart-container">
      <h2>Giỏ Hàng</h2>

      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.idsanpham}>
                    <td>{item.tensanpham}</td>
                    <td>{item.gia.toLocaleString()} VND</td>
                    <td>
                      <button onClick={() => decreaseQuantity(item.idsanpham)}>-</button>
                      {item.soluongsp}
                      <button onClick={() => increaseQuantity(item.idsanpham)}>+</button>
                    </td>
                    <td>{(item.gia * item.soluongsp).toLocaleString()} VND</td>
                    <td>
                      <button onClick={() => removeItem(item.idsanpham)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="total">
            <h3>Tổng tiền: {total.toLocaleString()} VND</h3>
          </div>

          <div className="payment-method">
            <h3>Chọn phương thức thanh toán:</h3>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              Thanh toán tiền mặt
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={paymentMethod === "bank_transfer"}
                onChange={() => setPaymentMethod("bank_transfer")}
              />
              Chuyển khoản ngân hàng
            </label>

            {paymentMethod === "bank_transfer" && (
              <div className="bank-verification">
                <h4>Xác nhận liên kết tài khoản:</h4>
                <label>
                  <input
                    type="checkbox"
                    checked={bankLinked}
                    onChange={(e) => setBankLinked(e.target.checked)}
                  />
                  Liên kết ngân hàng
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={momoLinked}
                    onChange={(e) => setMomoLinked(e.target.checked)}
                  />
                  Liên kết ví MoMo
                </label>
              </div>
            )}

          </div>

          <div className="order-button">
            {paymentMethod === "cash" ? (
              <button onClick={handlePlaceOrder}>Đặt hàng (Tiền mặt)</button>
            ) : (paymentMethod === "bank_transfer" || momoLinked) ? (
              <button onClick={handlePlaceOrder}>Đặt hàng (Chuyển khoản / MoMo)</button>
            ) : (
              <button disabled>Vui lòng chọn phương thức thanh toán</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GioHang;

