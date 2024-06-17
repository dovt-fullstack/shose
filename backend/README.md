# BE

## VNPAY

## [POST] http://localhost:8080/api/vnpay/create-url
<!-- api tạo đường dẫn tới trang vnpay -->

{
    "vnp_OrderInfo": "Thanh toán đơn hàng test",
    <!-- Tên thanh toán -->
    "totalPrice":10000,
    <!-- Tổng số tiền thanh toán -->
    "bank_code":"",
    "language":"vn",
    "user": "6533936415fe0386e84bf4b9",
    <!-- UserId id người thanh toán -->
    "product":"653393ab15fe0386e84bf4bb"
    <!-- Tên sản phẩm thanh toán -->
}

-   kết quả {
    url_redierct: Đường dẫn tới trang thanh toán của vnpay,
    url_return: ĐƯờng dẫn sau khi thanh toán xong
    }

*   Coppy url_redierct lên google

## Thong tin thẻ test
    Ngân hàng NCB
    Số thẻ 9704198526191432198
    Tên chủ thẻ NGUYEN VAN A
    Ngày phát hành 07/15
    Mật khẩu OTP 123456

## [GET] http://localhost:8080/api/payments
<!-- api lấy danh sách những thanh toán -->

## http://localhost:8080/api/sales
[POST] {
    "name":"Sale giảm 11",
    "sale":"-2000",
    "usageLimit":2020,
    "expirationDate":"22/10/2023"
}