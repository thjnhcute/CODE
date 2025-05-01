import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/PromotionsPage.css"; 

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/promotions"); 
      setPromotions(response.data);
    } catch (err) {
      console.error("Lỗi khi tải khuyến mãi:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <div className="promotions-page">
      <h1>Khuyến mãi hấp dẫn</h1>
      <p>Khám phá các ưu đãi và giảm giá mới nhất!</p>

      {loading && <p>Đang tải khuyến mãi...</p>}
      {error && <p className="error">{error}</p>}

      <div className="promotions-container">
        {promotions && promotions.length > 0 ? (
          promotions.map((promo) => (
            <div key={promo.id} className="promotion-item">
              <img src={promo.image} alt={promo.title} className="promotion-image" />
              <div className="promotion-info">
                <h2>{promo.title}</h2>
                <p>{promo.description}</p>
                <button className="shop-now-button" onClick={() => window.location.href = "/productcard"}>
                  Mua ngay
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>Không có khuyến mãi nào hiện tại.</p>
        )}
      </div>
    </div>
  );
};

export default PromotionsPage;
