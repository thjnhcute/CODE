import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="logo">DrinkStore</a>
                <ul className="nav-links">
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="/products">Sản phẩm</a></li>
                    <li><a href="/cart">Giỏ hàng</a></li>
                    <li><a href="/about">Liên hệ</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
