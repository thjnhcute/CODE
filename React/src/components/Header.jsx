import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  // Kiểm tra token khi component được mount
  const checkToken = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole || "");
    } else {
      setIsLoggedIn(false);
      setRole("");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Kiểm tra token khi component được mount
  useEffect(() => {
    setIsLoggedIn(checkToken());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    navigate("/products");
    console.log("Đã đăng xuất");
  };

return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/products">
          <strong className="highlighted-text">Tigon - Tea & Coffee</strong>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/products">
                Trang Chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productcard">
                Sản Phẩm
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/giohang">
              Giỏ Hàng
              </Link>
            </li>
            {isLoggedIn ? (
              role === "admin" ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Quản lý người dùng
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/products/">
                      Danh Sách Sản Phẩm
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/orders">
                      Danh Sách Đơn Hàng
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Hồ Sơ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-danger nav-link"
                      onClick={handleLogout}
                    >
                      Đăng Xuất
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Hồ Sơ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-danger nav-link"
                      onClick={handleLogout}
                    >
                      Đăng Xuất
                    </button>
                  </li>
                </>
              )
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Đăng Nhập
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Đăng Ký
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
