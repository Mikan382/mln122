# UI regression rules

## Modal chỉ có một scroll owner

- Modal dài dùng `.overlay__viewport` làm vùng cuộn duy nhất.
- Surface chỉ giữ header/close button và viewport; content bên trong không tự đặt `overflow`.
- Timer hoặc trạng thái phụ chỉ cập nhật DOM tại chỗ, không render lại toàn modal vì sẽ làm mất vị trí cuộn và focus.
- Chi tiết trang trí trên ảnh chỉ được tồn tại khi truyền đạt trạng thái; không dùng route/node/grid giả nếu người chơi không thể đọc ra ý nghĩa.

### Incident log

- 2026-07-23 — MLN122 — Presenter modal bị cắt nội dung do surface và dialog cùng kiểm soát overflow; timer render lại modal; ảnh hệ quả có route/node giống lỗi UI. Đã chuyển sang một viewport cuộn và bỏ artifact không mang thông tin.
