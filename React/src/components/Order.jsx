import axios from 'axios';

const placeOrder = async (items, totalPrice, token) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/orders/create',
            { items, totalPrice },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 201) {
            console.log('Đặt hàng thành công. ID đơn hàng:', response.data.orderId);
            alert('Đơn hàng đã được đặt thành công!');
        }
    } catch (error) {
        console.error('Lỗi khi đặt hàng:', error.message);
        alert('Đặt hàng thất bại. Vui lòng thử lại.');
    }
};
