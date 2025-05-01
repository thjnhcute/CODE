import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "../css/ProductCard.css"; // CSS tùy chỉnh
import { useNavigate } from "react-router-dom";


const ProductCards = () => {
    const [products, setProducts] = useState([]); // Dữ liệu sản phẩm
    const [loading, setLoading] = useState(true); // Trạng thái tải
    const [error, setError] = useState(null); // Lỗi
    const [cart, setCart] = useState([]); // Giỏ hàng
    const [filter, setFilter] = useState({ tensanpham: '', gia: '', idsanpham: '' }); // Trạng thái lọc
    const [categories, setCategories] = useState([]);
    // const [newProductImage] = useState(null);

    // Lấy danh sách sản phẩm từ API
    const fetchProducts = async (filters = {}) => {
        setLoading(true);
        try {
            const query = new URLSearchParams(filters).toString();
            const response = await axios.get(`http://localhost:5000/products/products`);
            console.log(query);
            setProducts(response.data);
            console.log(response);

        } catch (err) {
            setError(err.response ? err.response.data : err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    // Hàm xử lý lọc sản phẩm
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => {
            const newFilter = { ...prevFilter, [name]: value };
            return newFilter;
        });
    };

    // Hàm tìm kiếm sản phẩm khi nhấn nút
    const handleSearch = async () => {
        const response = await axios.get("http://localhost:5000/products/filter", {
            params: {
                tensanpham: filter.tensanpham,
                gia: filter.gia,
                idsanpham: filter.idsanpham
            }
        })
        setProducts(response.data)
    };


    const navigate = useNavigate();

    // Xem san pham
    const handleViewProduct = (sanpham) => {
        navigate(`/products/products/${sanpham.idsanpham}`);
    };

    const isLoggedIn = !!localStorage.getItem("token");

    // Hàm xử lý thêm sản phẩm vào giỏ hàng
    const handleAddToCart = async (sanpham) => {
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/giohang/add", {
                gia: sanpham.gia,
                idsanpham: sanpham.idsanpham,
                soluongsp: 1,
                tensanpham: sanpham.tensanpham,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                setCart((prevCart) => [...prevCart, { ...sanpham, soluongsp: 1 }]);
                alert(`Đã thêm ${sanpham.tensanpham} vào giỏ hàng!`);
            }
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
            alert("Không thể thêm sản phẩm vào giỏ hàng.");
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/categories");
                setCategories(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
            {loading && <p>Đang tải dữ liệu sản phẩm...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Form lọc và nút tìm kiếm */}
            <div className="filter-container">
                <input
                    type="text"
                    name="tensanpham"
                    placeholder="Tìm theo tên sản phẩm"
                    value={filter.tensanpham}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="gia"
                    placeholder="Tìm theo giá tối đa"
                    value={filter.gia}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="idloaisp"
                    placeholder="Tìm theo loại sản phẩm"
                    value={filter.idloaisp}
                    onChange={handleFilterChange}
                />
                <button className="search-btn" onClick={handleSearch}>
                    Tìm sản phẩm
                </button>
            </div>



            <div className="product-container">
                {products && products.length > 0 ? (
                    products.map((sanpham) => (
                        <div key={sanpham.idsanpham} className="product-item">
                            <h2>{sanpham.tensanpham}</h2>
                            <p>Giá: {sanpham.gia.toLocaleString()} VND</p>
                            <p>Số lượng còn: {sanpham.soluongsp}</p>
                            <img
                                // src={sanpham.hinhanh || 'default-image.jpg'}
                                src={`http://localhost:5000/hinhanh/${sanpham.hinhanh}`}
                                alt={sanpham.tensanpham}
                                style={{ width: "150px", height: "150px" }}
                            />

                            <div>
                                <button
                                    className="view-product-btn"
                                    onClick={() => handleViewProduct(sanpham)}
                                >
                                    Xem sản phẩm
                                </button>

                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => handleAddToCart(sanpham)}
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </div>

                        </div>
                    ))
                ) : (
                    !loading && <p>Không có sản phẩm nào.</p>
                )}
            </div>
        </div>
    );
};

export default ProductCards;

