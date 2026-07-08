import os
import json

brain_dir = os.path.expanduser('~/.gemini/antigravity-ide/brain')
keywords = ["Thương Trường Xuyên Thế Kỷ", "Sàn giao dịch Đổi Mới", "firebase-app-compat", "build-a-society", "mln11"]

print("Đang quét sâu vào toàn bộ nội dung từng dòng code của các lịch sử chat...")
found_convs = set()

if os.path.exists(brain_dir):
    for conv_id in os.listdir(brain_dir):
        log_path = os.path.join(brain_dir, conv_id, '.system_generated', 'logs', 'transcript.jsonl')
        if os.path.exists(log_path):
            try:
                with open(log_path, 'r', encoding='utf-8') as f:
                    for line in f:
                        line_lower = line.lower()
                        for kw in keywords:
                            if kw.lower() in line_lower:
                                if conv_id not in found_convs:
                                    print(f"\n=> [TÌM THẤY] Cuộc trò chuyện ID: {conv_id}")
                                    print(f"   Có chứa từ khóa/code: '{kw}'")
                                    found_convs.add(conv_id)
                                break
            except Exception as e:
                pass

if not found_convs:
    print("\n[KHÔNG TÌM THẤY] Không có lịch sử nào chứa đoạn code hay từ khóa này trên máy tính hiện tại.")
    print("=> Có thể cuộc trò chuyện này đã được tạo ở một máy tính khác, trên phiên bản Web, hoặc đã bị xóa.")
