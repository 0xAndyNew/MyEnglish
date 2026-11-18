# MyEnglish — Nền Tảng Tự Học Tiếng Anh Theo Lộ Trình Bài Bản

## About / Giới thiệu

**MyEnglish** là ứng dụng web tương tác hỗ trợ người Việt học tiếng Anh bài bản từ con số 0 (A0 → B2) theo lộ trình một chiều rõ ràng, kết hợp **Phonics (nhận diện mặt chữ & âm câm)**, **44 âm IPA**, **Ngữ pháp chuẩn hóa từng bước**, **Lab 120 bài Ghép câu**, **Nghe–Đọc–Nói tích hợp**, **Viết song ngữ Việt ↔ Anh**, và **Ôn tập ngắt quãng SRS (SM-2)**.

Ứng dụng hoạt động đầy đủ ngay cả khi **không có AI Key** (nhờ bộ phát âm Web Speech Synthesis, thu âm tự nghe lại qua `MediaRecorder`, chấm điểm Offline), đồng thời hỗ trợ **Gemini AI** (`gemini-3.8-flash` + tự động fallback) được quản trị tập trung tại mục Admin để tạo thêm bài thực hành và chấm/sửa bài chi tiết.

---

## Lộ trình Mầm non (1–6 tuổi) — Học như Trung tâm Ngoại ngữ

Nhóm đối tượng **Mầm non (`preschool`)** có giao diện Kid Mode toàn màn hình (chữ to, nút ≥ 80px, chạm là phát âm, không cần biết đọc) và giáo trình 3 cấp độ giống trung tâm:

- **Tiny Tots (1–2 tuổi)**: 2 Term · 8 Unit · 32 buổi (5–7 phút/buổi, bố mẹ cùng chơi).
- **Little Explorers (3–4 tuổi)**: 3 Term · 12 Unit · 48 buổi (10–12 phút/buổi, từ vựng + mẫu câu + tô hình).
- **Bright Stars (5–6 tuổi)**: 3 Term · 12 Unit · 48 buổi (12–15 phút/buổi, 26 âm Jolly Phonics + ghép âm CVC + hỏi đáp + tô chữ).
- **Chức năng trung tâm**: Lịch học theo **Term – Tuần – Buổi học** (2 buổi/tuần mặc định, chèn Tuần ôn tập cuối mỗi Term), góc **Bài hát Karaoke**, **Truyện tranh tương tác**, **Album Sticker**, **Nhắc nghỉ mắt** và **Cổng Phụ Huynh** (giữ 2 giây + phép tính).

---

## Lộ trình 7 Bước Tích Hợp

| Bước | Tên bước | Nội dung chính |
| :--- | :--- | :--- |
| **B1A** | **26 Chữ cái A–Z** | Nghe phát âm US/UK, tập viết nét chữ cái, kiểm tra nhận diện từng chữ & lưu tiến độ. |
| **B1B** | **44 Âm IPA** | 20 Nguyên âm + 24 Phụ âm & Âm cuối, cặp âm dễ nhầm lẫn, kiểm tra từng cặp IPA. |
| **B2A** | **Nạp Từ vựng** | 133 bài khóa tuần tự kèm thẻ phân tích giải phẫu từ (tô màu âm tiết, âm câm, Phonics, Mnemonic) & đọc thử chấm điểm. |
| **B2B** | **Ngữ pháp** | 14 bài ngữ pháp trọng tâm (Danh từ, Động từ, Tính từ, Trạng từ, Mạo từ `a/an/the`, `S+V+O`, 6 Thì, Câu hỏi, Câu nối/Điều kiện) kèm phân tích ví dụ theo màu, bảng so sánh 6 thì trong 1 nháy mắt & **Bài 15 Thi Tổng Hợp**. Hoàn thành B2B sẽ mở khóa toàn bộ các bước thực hành phía sau. |
| **B2C** | **Lab Ghép Câu (160 bài)** | Kho **160 bài ghép câu** từ A1 → B2 lọc theo cấp độ, chủ đề ngữ pháp & số lượng bài tùy chọn (`10 / 20 / 50 / Tất cả`), tự phát âm khi bấm từng thẻ từ. |
| **B3** | **Luyện Nghe & Nói** | • **40 bài Nghe & Đọc Cơ Bản** (chuẩn chủ đề British Council / VOA / BBC) kèm tốc độ `0.75x / 0.9x / 1.0x`, tra từ trực tiếp trên bài đọc, câu hỏi hiểu bài & **Đọc nhại Shadowing**.<br>• **25+ câu mẫu Luyện Nói** + tự nhập câu + thu âm tự nghe lại.<br>• **8+ kịch bản Hội thoại tình huống**.<br>• Tích hợp **AI tạo thêm bài nghe, câu nói & hội thoại mới**. |
| **B4** | **Đọc, Viết & SRS** | • **Luyện Viết Song Ngữ (`Việt ↔ Anh`)**: **24 bài mẫu** đa dạng công việc + AI tạo đề theo nghề nghiệp + chấm điểm 0–100 (Offline & Gemini AI).<br>• **Đọc & Quét ảnh OCR (`Tesseract.js`)**: Quét ảnh sách/tài liệu tiếng Anh để dịch & tra từ.<br>• **Kho 980+ Từ Cốt Lõi** & **Ôn tập SRS (1-3-7-30 ngày)**. |

---

## Tính năng Quản trị & Lưu trữ SQLite

- **Cơ sở dữ liệu SQLite (`data/myenglish.db`)**: Chạy bằng `node:sqlite` (`DatabaseSync`) tích hợp sẵn trên Node.js v22.5+, lưu trữ chuẩn 5 bảng quan hệ (`users`, `sessions`, `user_progress`, `saved_words`, `app_settings`).
- **Tài khoản thường (`@gmail.com`)**: Đăng ký/đăng nhập đồng bộ qua REST API (`/api/auth/*`), mật khẩu mã hóa an toàn bằng `scrypt` + salt, khóa lộ trình tuần tự từng bài và từng bước.
- **Mục Quản trị Admin (`admin`)**:
  - Bật/tắt chế độ Dev mở khóa nhanh để kiểm tra bài học.
  - Cấu hình & kiểm tra kết nối **Gemini API Key** lưu trực tiếp trong SQLite Server (`app_settings`) và gọi qua proxy `/api/ai/generate` (trình duyệt học viên không bao giờ thấy được API Key).
  - Thêm mới & quản lý trực tiếp các bài **Ghép câu, Nghe & Đọc, Hội thoại, Viết song ngữ** lưu trong bảng `custom_lessons` của SQLite (hỗ trợ cả **AI Soạn Nhanh**).
  - Quản lý danh sách tài khoản trong SQLite: Reset tiến độ học, Reset mật khẩu (`123456`) hoặc Xóa tài khoản thường.

---

## Công nghệ sử dụng

- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS 3, Lucide Icons, Canvas Confetti
- **Backend & Database**: Node.js built-in `http`, `crypto` (`scrypt`), **SQLite (`node:sqlite`)**
- **Audio & Speech**: Web Speech API (`speechSynthesis` US/UK & `SpeechRecognition`) + `MediaRecorder` thu âm tự nghe lại
- **AI & OCR**: Google Gemini API (`gemini-3.8-flash` với fallback `gemini-3.8-flash-lite` / `gemini-flash-latest`), `tesseract.js`

---

## Cài đặt & Chạy trên máy (Local Development)

### Yêu cầu môi trường
- **Node.js >= 22.5** (khuyến nghị Node 24/26 để sử dụng `node:sqlite` tích hợp sẵn)
- npm >= 9

### Các bước chạy dự án
```bash
# 1. Clone repository
git clone https://github.com/0xAndyNew/MyEnglish.git
cd MyEnglish

# 2. Cài đặt thư viện
npm install

# 3. Terminal 1 — Chạy SQLite API Server (cổng 3001)
npm run server

# 4. Terminal 2 — Chạy Frontend Vite Dev Server (cổng 5173)
npm run dev

# Hoặc build bản Production & phục vụ trọn gói cả Frontend + SQLite API trên cổng 3001:
npm run build
npm start
```

Mở trình duyệt tại `http://localhost:5173/` (môi trường dev) hoặc `http://localhost:3001/` (production) để sử dụng.

---

## Giấy phép

Phát hành theo giấy phép có trong file [LICENSE](./LICENSE).
