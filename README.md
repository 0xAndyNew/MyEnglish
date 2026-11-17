# MyEnglish — Nền Tảng Tự Học Tiếng Anh Theo Lộ Trình Bài Bản

## About / Giới thiệu

**MyEnglish** là ứng dụng web tương tác hỗ trợ người Việt học tiếng Anh bài bản từ con số 0 (A0 → B2) theo lộ trình một chiều rõ ràng, kết hợp **Phonics (nhận diện mặt chữ & âm câm)**, **44 âm IPA**, **Ngữ pháp chuẩn hóa từng bước**, **Lab 120 bài Ghép câu**, **Nghe–Đọc–Nói tích hợp**, **Viết song ngữ Việt ↔ Anh**, và **Ôn tập ngắt quãng SRS (SM-2)**.

Ứng dụng hoạt động đầy đủ ngay cả khi **không có AI Key** (nhờ bộ phát âm Web Speech Synthesis, thu âm tự nghe lại qua `MediaRecorder`, chấm điểm Offline), đồng thời hỗ trợ **Gemini AI** (`gemini-3.8-flash` + tự động fallback) được quản trị tập trung tại mục Admin để tạo thêm bài thực hành và chấm/sửa bài chi tiết.

---

## Lộ trình 7 Bước Tích Hợp

| Bước | Tên bước | Nội dung chính |
| :--- | :--- | :--- |
| **B1A** | **26 Chữ cái A–Z** | Nghe phát âm US/UK, tập viết nét chữ cái, kiểm tra nhận diện từng chữ & lưu tiến độ. |
| **B1B** | **44 Âm IPA** | 20 Nguyên âm + 24 Phụ âm & Âm cuối, cặp âm dễ nhầm lẫn, kiểm tra từng cặp IPA. |
| **B2A** | **Nạp Từ vựng** | 133 bài khóa tuần tự kèm thẻ phân tích giải phẫu từ (tô màu âm tiết, âm câm, Phonics, Mnemonic) & đọc thử chấm điểm. |
| **B2B** | **Ngữ pháp** | 14 bài ngữ pháp trọng tâm (Danh từ, Động từ, Tính từ, Trạng từ, Mạo từ `a/an/the`, `S+V+O`, 6 Thì, Câu hỏi, Câu nối/Điều kiện) kèm phân tích ví dụ theo màu, bảng so sánh 6 thì trong 1 nháy mắt & **Bài 15 Thi Tổng Hợp**. Hoàn thành B2B sẽ mở khóa toàn bộ các bước thực hành phía sau. |
| **B2C** | **Lab Ghép Câu (120 bài)** | Kho 120 bài ghép câu từ A1 → B2 lọc theo cấp độ, chủ đề ngữ pháp & số lượng bài tùy chọn (`10 / 20 / 50 / Tất cả`), tự phát âm khi bấm từng thẻ từ. |
| **B3** | **Luyện Nghe & Nói** | • **30 bài Nghe & Đọc Cơ Bản** (chuẩn chủ đề British Council / VOA / BBC) kèm tốc độ `0.75x / 0.9x / 1.0x`, tra từ trực tiếp trên bài đọc, câu hỏi hiểu bài & **Đọc nhại Shadowing**.<br>• **15+ câu mẫu Luyện Nói** + tự nhập câu + thu âm tự nghe lại.<br>• **Hội thoại tình huống**.<br>• Tích hợp **AI tạo thêm bài nghe, câu nói & hội thoại mới**. |
| **B4** | **Đọc, Viết & SRS** | • **Luyện Viết Song Ngữ (`Việt ↔ Anh`)**: 16 bài mẫu đa dạng công việc + AI tạo đề theo nghề nghiệp + chấm điểm 0–100 (Offline & Gemini AI).<br>• **Đọc & Quét ảnh OCR (`Tesseract.js`)**: Quét ảnh sách/tài liệu tiếng Anh để dịch & tra từ.<br>• **Kho 980+ Từ Cốt Lõi** & **Ôn tập SRS (1-3-7-30 ngày)**. |

---

## Tính năng Quản trị & Bảo mật Tiến độ

- **Lưu tiến độ độc lập theo tài khoản**: Mỗi tài khoản Gmail đăng ký trên trình duyệt được tách riêng lộ trình mở khóa, điểm XP, từ vựng đã lưu và thẻ SRS (`localStorage`).
- **Tài khoản thường (`@gmail.com`)**: Khóa lộ trình tuần tự từng bài và từng bước để đảm bảo học chắc kiến thức nền.
- **Mục Quản trị Admin (`admin@hieupro.io.vn`)**:
  - Bật/tắt chế độ Dev mở khóa nhanh để kiểm tra bài học.
  - Cấu hình & kiểm tra kết nối **Gemini API Key** dùng chung cho toàn hệ thống (giao diện học viên chỉ hiển thị các nút thực hiện AI, không lộ ô nhập API Key).
  - Quản lý danh sách tài khoản học viên: Reset tiến độ học, Reset mật khẩu hoặc Xóa tài khoản thường.

---

## Công nghệ sử dụng

- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS 3, Lucide Icons, Canvas Confetti
- **Audio & Speech**: Web Speech API (`speechSynthesis` US/UK & `SpeechRecognition`) + `MediaRecorder` thu âm tự nghe lại
- **AI & OCR**: Google Gemini API (`gemini-3.8-flash` với fallback `gemini-3.8-flash-lite` / `gemini-flash-latest`), `tesseract.js`
- **Lưu trữ**: Client-side `localStorage` (hỗ trợ Export/Sao lưu tiến độ JSON)

---

## Cài đặt & Chạy trên máy (Local Development)

### Yêu cầu môi trường
- Node.js >= 18
- npm >= 9

### Các bước chạy dự án
```bash
# 1. Clone repository
git clone https://github.com/0xAndyNew/MyEnglish.git
cd MyEnglish

# 2. Cài đặt thư viện
npm install

# 3. Chạy môi trường phát triển (Dev Server)
npm run dev

# 4. Build bản Production
npm run build
```

Mở trình duyệt tại `http://localhost:5173/` để sử dụng.

---

## Giấy phép

Phát hành theo giấy phép có trong file [LICENSE](./LICENSE).
