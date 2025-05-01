-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 11, 2024 lúc 08:13 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `baocao`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietdathang`
--

CREATE TABLE `chitietdathang` (
  `idchitietdh` int(11) NOT NULL,
  `iddathang` int(11) DEFAULT NULL,
  `idsanpham` int(11) DEFAULT NULL,
  `soluongdh` int(11) DEFAULT NULL,
  `gia` decimal(10,2) DEFAULT NULL,
  `tonggia` decimal(10,2) DEFAULT NULL,
  `soluongsp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietdathang`
--

INSERT INTO `chitietdathang` (`idchitietdh`, `iddathang`, `idsanpham`, `soluongdh`, `gia`, `tonggia`, `soluongsp`) VALUES
(1, 9, 4, NULL, 39000.00, NULL, 4),
(2, 10, 4, NULL, 39000.00, NULL, 4),
(3, 11, 4, NULL, 39000.00, NULL, 4),
(4, 12, 4, NULL, 39000.00, NULL, 6),
(5, 13, 4, NULL, 39000.00, NULL, 6),
(6, 14, 2, NULL, 25000.00, NULL, 1),
(7, 15, 2, NULL, 25000.00, NULL, 1),
(8, 16, 4, NULL, 39000.00, NULL, 3),
(9, 17, 2, NULL, 25000.00, NULL, 1),
(10, 18, 4, NULL, 39000.00, NULL, 12),
(11, 19, 4, NULL, 39000.00, NULL, 12),
(12, 20, 4, NULL, 39000.00, NULL, 12),
(13, 21, 4, NULL, 39000.00, NULL, 12),
(14, 22, 2, NULL, 25000.00, NULL, 3),
(15, 23, 2, NULL, 25000.00, NULL, 3),
(16, 23, 1, NULL, 20000.00, NULL, 1),
(17, 24, 2, NULL, 25000.00, NULL, 1),
(18, 25, 4, NULL, 39000.00, NULL, 1),
(19, 26, 2, NULL, 25000.00, NULL, 3),
(20, 26, 1, NULL, 20000.00, NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dathang`
--

CREATE TABLE `dathang` (
  `iddathang` int(11) NOT NULL,
  `iduser` int(11) DEFAULT NULL,
  `ngaydh` date DEFAULT NULL,
  `diachigh` text DEFAULT NULL,
  `tongtiendh` decimal(10,2) DEFAULT NULL,
  `ptthanhtoan` enum('tienmat','tructuyen') NOT NULL DEFAULT 'tienmat',
  `trangthai` enum('choxacnhan','dangchuanbi','danggiaohang','dagiaohang','huydonhang') NOT NULL DEFAULT 'choxacnhan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dathang`
--

INSERT INTO `dathang` (`iddathang`, `iduser`, `ngaydh`, `diachigh`, `tongtiendh`, `ptthanhtoan`, `trangthai`) VALUES
(9, 34, '2024-12-10', NULL, NULL, 'tienmat', ''),
(10, 34, '2024-12-10', NULL, NULL, 'tienmat', ''),
(11, 34, '2024-12-10', NULL, NULL, 'tienmat', ''),
(12, 34, '2024-12-10', NULL, NULL, 'tienmat', ''),
(13, 34, '2024-12-10', NULL, NULL, 'tienmat', ''),
(14, 28, '2024-12-10', NULL, NULL, 'tienmat', ''),
(15, 28, '2024-12-10', NULL, NULL, 'tienmat', ''),
(16, 28, '2024-12-11', NULL, NULL, 'tienmat', ''),
(17, 28, '2024-12-11', NULL, NULL, '', ''),
(18, 34, '2024-12-11', NULL, NULL, '', ''),
(19, 34, '2024-12-11', NULL, NULL, '', ''),
(20, 34, '2024-12-11', NULL, NULL, '', ''),
(21, 34, '2024-12-11', NULL, NULL, '', ''),
(22, 34, '2024-12-11', NULL, NULL, '', ''),
(23, 34, '2024-12-11', NULL, NULL, '', ''),
(24, 28, '2024-12-11', NULL, NULL, '', ''),
(25, 28, '2024-12-11', NULL, NULL, '', ''),
(26, 34, '2024-12-11', NULL, NULL, '', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giohang`
--

CREATE TABLE `giohang` (
  `idgiohang` int(11) NOT NULL,
  `iduser` int(11) DEFAULT NULL,
  `idsanpham` int(11) NOT NULL,
  `tensanpham` varchar(255) NOT NULL,
  `gia` int(11) NOT NULL,
  `hinhanh` varchar(255) NOT NULL,
  `soluongsp` int(11) DEFAULT NULL,
  `mota` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `idloaisp` int(11) NOT NULL,
  `tenloai` varchar(100) NOT NULL,
  `motaloai` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `loaisanpham`
--

INSERT INTO `loaisanpham` (`idloaisp`, `tenloai`, `motaloai`) VALUES
(1, 'tra trai cay', 'tuoi mat'),
(2, 'tra sua', 'khong co mo ta');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `idsanpham` int(11) NOT NULL,
  `tensanpham` varchar(100) NOT NULL,
  `mota` text DEFAULT NULL,
  `idloaisp` int(11) DEFAULT NULL,
  `hinhanh` varchar(255) DEFAULT NULL,
  `soluongsp` int(11) DEFAULT NULL,
  `gia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`idsanpham`, `tensanpham`, `mota`, `idloaisp`, `hinhanh`, `soluongsp`, `gia`) VALUES
(1, 'Trà Dâu', 'Trà Dâu - Hương vị thanh mát, ngọt ngào\r\n\r\nTrà dâu là một thức uống đang làm mưa làm gió trong cộng đồng những người yêu thích đồ uống giải khát. Sự kết hợp hoàn hảo giữa vị chua thanh của dâu tây và hương thơm dịu nhẹ của trà mang đến một trải nghiệm vô cùng thú vị. Mỗi ngụm trà dâu như một làn gió mát, xua tan đi cái nóng oi bức của mùa hè. Không chỉ thơm ngon, trà dâu còn chứa nhiều vitamin và khoáng chất tốt cho sức khỏe, đặc biệt là vitamin C có tác dụng tăng cường hệ miễn dịch. Hãy thưởng thức một ly trà dâu ngay hôm nay để cảm nhận trọn vẹn hương vị tuyệt vời của thức uống này nhé!', 1, '/hinhanh/tradau.jpg', 10, 20000),
(2, 'Trà chanh giải nhiệt', 'ngon lắm á', 1, '/hinhanh/trachanh.jpg', 12, 25000),
(3, 'Latte Dưa Lưới', 'Latte dưa lưới là một thức uống thơm ngon, hấp dẫn, kết hợp giữa vị ngọt nhẹ của dưa lưới tươi mát và hương vị béo ngậy của sữa. Khi thưởng thức, bạn sẽ cảm nhận được sự hòa quyện hoàn hảo giữa lớp kem sữa mịn màng và những miếng dưa lưới mát lạnh, tạo nên một trải nghiệm thú vị cho vị giác. Thức uống thường được trang trí đẹp mắt với một chút bột quế hoặc hạt dưa lưới, mang đến cảm giác vừa ngon miệng vừa bắt mắt. Latte dưa lưới không chỉ là một món giải khát lý tưởng trong những ngày hè oi ả, mà còn là một lựa chọn tuyệt vời để tận hưởng những khoảnh khắc thư giãn.', 2, '/hinhanh/lattedualuoi.jpg', 15, 42000),
(4, 'Latte Matcha Dâu', 'Latte matcha dâu là một sự kết hợp hoàn hảo giữa hương vị thơm ngon của matcha và sự tươi mát, ngọt ngào của dâu tây. Ly latte này mang đến một trải nghiệm thú vị với lớp bọt sữa mịn màng hòa quyện cùng bột matcha xanh đặc trưng, kết hợp với nước cốt dâu tây tươi tạo nên một hương vị vừa thanh mát, vừa ngọt dịu. Đây là lựa chọn lý tưởng cho những ai yêu thích sự mới lạ và sáng tạo trong từng ngụm đồ uống. Latte matcha dâu không chỉ là thức uống ngon miệng mà còn mang đến cảm giác thư giãn, sảng khoái cho ngày mới.', 2, '/hinhanh/lattedau.jpg', 10, 39000),
(5, 'Trà Oolong sen vàng', 'Trà sen kem tươi là một món thức uống tinh tế, mang đậm hương vị của thiên nhiên. Ly trà có màu xanh nhạt, nhẹ nhàng với những bông sen tươi được hòa quyện, mang đến cảm giác thanh mát. Khi nhấp một ngụm, bạn sẽ cảm nhận được vị trà thơm lừng, hòa quyện cùng vị ngọt nhẹ của kem tươi mềm mịn. Lớp kem trắng ngần trên bề mặt như một lớp áo bảo vệ, tạo nên sự cân bằng hoàn hảo giữa vị chát của trà và vị béo ngậy của kem. Mùi hương thơm dịu của hoa sen thoang thoảng trong không khí, khiến cho mỗi giây phút thưởng thức trở nên đặc biệt hơn. Trà sen kem tươi không chỉ là một món giải khát, mà còn là một trải nghiệm ẩm thực đầy nghệ thuật và thanh lịch.', 1, '/hinhanh/trasen.jpg', 20, 42000),
(10, 'Latte Matcha Xoài', 'Latte matcha xoài là sự kết hợp độc đáo giữa vị thanh mát của trà xanh matcha, hương thơm ngọt ngào của xoài chín và lớp sữa béo ngậy. Thức uống này không chỉ gây ấn tượng bởi màu sắc bắt mắt, hòa quyện giữa sắc xanh của matcha và sắc vàng của xoài, mà còn mang đến trải nghiệm hương vị phong phú. Vị đắng nhẹ đặc trưng của matcha cân bằng hoàn hảo với sự ngọt ngào tự nhiên từ xoài, tạo nên một món đồ uống vừa thơm ngon, vừa bổ dưỡng. Latte matcha xoài là lựa chọn lý tưởng để giải nhiệt và tiếp thêm năng lượng cho ngày mới.', 2, '/hinhanh/lattexoai.jpg', 15, 35000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `iduser` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`iduser`, `username`, `password`, `fullname`, `email`, `address`, `phone`, `role`) VALUES
(1, 'annhien', '$2b$10$TUUyfWyTtfJZOm3wWSIvXOFzUZrQ9eTrCm1FZcZxE3X4eOjWHiZm.', 'an nhien', 'npak1103@gmail.com', 'Vĩnh Long', '0353834005', 'user'),
(10, 'admin', '123', 'tao la admin day', 'admin.admin', 'day la dia chi', '0113113', 'admin'),
(28, 'anhtien123', '$2b$10$.37KnBFIaeiuW6nq3LnyCO5SnC5u3zuvUGg1Pl45bopIGeNLK/POW', 'antien123', 'hanhphuchatmam@gmail.com', 'Hậu Giang Tà ', '0869176167', 'user'),
(32, 'nemo', '$2b$10$8ulYA4KsGVfIsCPU43Qd/uAd7x7fNjRBs.emw6GZFQpPmAerjcRA.', 'Nemo', 'tien@gmail.com', 'angzgiang', '099999999', 'user'),
(33, 'phuocthinh', '$2b$10$BOb0EF33yryVRPs5Vb4bce0aKUGFeRNJYJzneFZT4cTR4OJISc8qi', 'Nguyễn Phước Thịnh', 'thinh@gmail.com', 'Vĩnh Long', '0353834005', 'user'),
(34, 'admin111', '$2b$10$uj9qoAAmSeFccRWJeRWMZeO4s4l3S7VVsTGvLKbY/HuGPvJ6BRM.m', 'lequocthinh', 'npak1103@gmail.com', 'Sóc Trăng', '0353834005', 'admin'),
(35, 'nhuy2002', '$2b$10$gAAem1xdmjkqsz7jgV8rSeRcsNHFlH1SGmU3buZMhBOX6RJt7HkvK', 'Phùng Thị Như Ý', 'npak1103@gmail.com', 'Hòa Thành, Cà Mau', '0353834005', 'user');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chitietdathang`
--
ALTER TABLE `chitietdathang`
  ADD PRIMARY KEY (`idchitietdh`),
  ADD KEY `iddonhang` (`iddathang`),
  ADD KEY `idsanpham` (`idsanpham`);

--
-- Chỉ mục cho bảng `dathang`
--
ALTER TABLE `dathang`
  ADD PRIMARY KEY (`iddathang`),
  ADD KEY `iduser` (`iduser`);

--
-- Chỉ mục cho bảng `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`idgiohang`),
  ADD KEY `idsanpham` (`idsanpham`),
  ADD KEY `iduser` (`iduser`);

--
-- Chỉ mục cho bảng `loaisanpham`
--
ALTER TABLE `loaisanpham`
  ADD PRIMARY KEY (`idloaisp`),
  ADD UNIQUE KEY `tenloai` (`tenloai`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`idsanpham`),
  ADD KEY `idloaisp` (`idloaisp`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chitietdathang`
--
ALTER TABLE `chitietdathang`
  MODIFY `idchitietdh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `dathang`
--
ALTER TABLE `dathang`
  MODIFY `iddathang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `giohang`
--
ALTER TABLE `giohang`
  MODIFY `idgiohang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT cho bảng `loaisanpham`
--
ALTER TABLE `loaisanpham`
  MODIFY `idloaisp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `idsanpham` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chitietdathang`
--
ALTER TABLE `chitietdathang`
  ADD CONSTRAINT `chitietdathang_ibfk_1` FOREIGN KEY (`iddathang`) REFERENCES `dathang` (`iddathang`),
  ADD CONSTRAINT `chitietdathang_ibfk_2` FOREIGN KEY (`idsanpham`) REFERENCES `sanpham` (`idsanpham`);

--
-- Các ràng buộc cho bảng `dathang`
--
ALTER TABLE `dathang`
  ADD CONSTRAINT `dathang_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`);

--
-- Các ràng buộc cho bảng `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `giohang_ibfk_1` FOREIGN KEY (`idsanpham`) REFERENCES `sanpham` (`idsanpham`),
  ADD CONSTRAINT `giohang_ibfk_2` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`idloaisp`) REFERENCES `loaisanpham` (`idloaisp`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
