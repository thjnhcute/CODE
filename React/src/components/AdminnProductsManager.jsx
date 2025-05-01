import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "../css/AdminProductsManager.css";

const AdminProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    idsanpham: "",
    tensanpham: "",
    gia: "",
    soluongsp: "",
    hinhanh: null,
    idloaisp:"",
    mota: ""
  });
  const [brands,setBrand] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // lay san pham
      const [productsRes] = await Promise.all([
        axios.get("http://localhost:5000/admin/products", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setProducts(productsRes.data);
    } catch (err) {
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };
  const fetchBrand =  async (req, res) => {
    try{
      const resultBrand = await axios.get(`http://localhost:5000/admin/getallbrand`);
      setBrand(resultBrand.data);
    }
    catch(err){
      req.json('Loi khi lay danh muc san pham',err);
    }
  }
  useEffect(() => {
    fetchData();
    fetchBrand()
  }, [token]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    console.log(form)
    if (!form.tensanpham || !form.gia || !form.soluongsp) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return false;
    }
    if (form.gia <= 0 || form.soluongsp <= 0) {
      alert("Giá và số lượng phải lớn hơn 0.");
      return false;
    }
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    });
    try {
      if (editing) {
        // cap nhat san pham
        await axios.post(`http://localhost:5000/admin/products/${form.idsanpham}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` ,
            // "Content-Type": "application/json",
          },
            
          }
        );
        alert("Cập nhật thành công!");
      } else {
        // them san pham moi
        await axios.post("http://localhost:5000/admin/products/", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Thêm sản phẩm thành công!");
      }
      fetchData();
    } catch (err) {
      console.error(err);
      
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };
  

  const handleEdit = (product) => {
    setForm(product);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`http://localhost:5000/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter((p) => p.idsanpham !== id));
        alert("Xóa sản phẩm thành công!");
      } catch (err) {
        alert("Không thể xóa sản phẩm!");
      }
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-products-manager">
      <h1>Quản Lý Sản Phẩm</h1>
      <form onSubmit={handleSubmit}>
    
        <input
          type="text"
          name="tensanpham"
          placeholder="Tên sản phẩm"
          value={form.tensanpham}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="mota"
          placeholder="Mô tả sản phẩm"
          value={form.mota}
          onChange={(e) =>
            setForm({
              ...form,
              mota: e.target.value,
            })}
          // onChange={handleFormChange}
        />
        <select value={form.idloaisp}  onChange={handleFormChange}  name="idloaisp" id="idloaisp">
          {
            brands.map((brand) => (
              <option value={brand.idloaisp} key={brand.idloaisp}>
                {brand.tenloai}
              </option>
            ))
          }
        </select>
        <input
          type="number"
          name="gia"
          placeholder="Giá"
          value={form.gia}
          onChange={handleFormChange}
        />
        <input
          type="number"
          name="soluongsp"
          placeholder="Số lượng"
          value={form.tonkho}
          onChange={(e) =>
            setForm({
              ...form,
              tonkho: e.target.value,
            })}
        />
        <input type="file" name="hinhanh" onChange={handleFormChange} />
        <button type="submit">{editing ? "Cập nhật" : "Thêm mới"}</button>
      </form>

      <table>
  <thead>
    <tr>
      <th>Tên</th>
      <th>Mô tả</th>
      <th>ID Loại</th>
      <th>Giá</th>
      <th>Số lượng</th>
      <th>Hành động</th>
    </tr>
  </thead>
  <tbody>
    {products.length > 0 ? (
      products.map((product) => (
        <tr key={product.idsanpham}>
          <td>{product.tensanpham || "Không có tên"}</td>
          <td>{product.mota || "Không có mô tả"}</td>
          <td>{product.idloaisp || "Chưa xác định"}</td>
          <td>
            {product.gia
              ? `${parseInt(product.gia).toLocaleString()} VND`
              : "Chưa có giá"}
          </td>
          <td>{product.tonkho || "Không xác định"}</td>
          <td>
            <button onClick={() => handleEdit(product)}>Sửa</button>
            <button onClick={() => handleDelete(product.idsanpham)}>
              Xóa
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" style={{ textAlign: "center" }}>
          Không có sản phẩm nào
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
};

export default AdminProductsManager;
