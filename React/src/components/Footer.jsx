import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Liên Hệ</h5>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-telephone-fill"></i> Điện thoại: 0786835783
              </li>
              <li>
                <i className="bi bi-envelope-fill"></i> Email:npthinh2100077@student.ctuet.edu.vn
                
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Liên Kết Nhanh</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/products" className="text-white text-decoration-none">
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>
              Mạng Xã Hội</h5>
            <ul className="list-unstyled d-flex">
              <li className="me-3">
                <a href="#" className="text-white">
                  <i className="bi bi-facebook fs-3"></i>
                </a>
              </li>
              <li className="me-3">
                <a href="#" className="text-white">
                  <i className="bi bi-twitter fs-3"></i>
                </a>
              </li>
              <li className="me-3">
                <a href="#" className="text-white">
                  <i className="bi bi-instagram fs-3"></i>
                </a>
              </li>
              <li className="me-3">
                <a href="#" className="text-white">
                  <i className="bi bi-youtube fs-3"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center py-3">
        <p>&copy; 2024 Website Design By QT0911</p>
      </div>
    </footer>
  );
};

export default Footer;
