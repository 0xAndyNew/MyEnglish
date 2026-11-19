# Tài Liệu Bàn Giao Kỹ Thuật & Vận Hành — Little English World (1–6 tuổi)

Tài liệu này đi kèm mã nguồn dự án và đặc tả [Little_English_World_Software_Spec.html](file:///d:/MyEnglish/Little_English_World_Software_Spec.html), hướng dẫn đầy đủ kiến trúc, cài đặt, quản trị CMS, phân quyền, sao lưu/khôi phục và kịch bản nghiệm thu End-to-End.

---

## 1. Tổng quan Kiến trúc & 3 Phân hệ

Hệ thống **Little English World** gồm 3 phân hệ tách biệt rõ ràng:

1. **Child Experience ([ChildHome.tsx](file:///d:/MyEnglish/src/components/preschool/ChildHome.tsx), [LessonFlow.tsx](file:///d:/MyEnglish/src/components/preschool/LessonFlow.tsx), [LewGames.tsx](file:///d:/MyEnglish/src/components/preschool/LewGames.tsx))**:
   - Giao diện hoạt hình thân thiện cho trẻ 1–6 tuổi cùng cha mẹ (Benny, Toto, Mimi, Kiki).
   - **Level 1 (1–2 tuổi · Little Listener)** mặc định chạy **Parent-led Mode** (Cha mẹ dẫn dắt theo khuyến nghị WHO, không để bé tự ngồi xem màn hình một mình).
   - **Bài học chuẩn 6 bước**: `1. Warm-up` → `2. Input (Từ & Câu mẫu)` → `3. Listening` → `4. Game (6 trò chơi)` → `5. Parent Activity & Story Time` → `6. Review, Sticker & Ghi nhận`.
   - **6 dạng trò chơi theo độ tuổi**: `Listen & Find`, `Match the Picture`, `What's Missing?`, `Sort by Category`, `Story Order (Xếp tranh kể chuyện 2–4 tranh)`, `Move & Say (Vận động ngoài màn hình)`.
   - **Bộ sưu tập Sticker**, **18 Bài hát thiếu nhi MP3** và **26 âm Phonics A–Z**.
   - **Không quảng cáo, không liên kết ngoài, không thu âm trẻ mặc định, không trừ điểm**.

2. **Parent Zone ([LewParentZone.tsx](file:///d:/MyEnglish/src/components/preschool/LewParentZone.tsx) & [ParentGate.tsx](file:///d:/MyEnglish/src/components/preschool/shell/ParentGate.tsx))**:
   - Bảo vệ bởi **Cổng Phụ Huynh (`ParentGate`)**: nhấn giữ 2 giây + giải phép cộng người lớn khi mở từ chế độ bé.
   - **Quản lý nhiều hồ sơ bé**: thêm/sửa/xóa hồ sơ anh chị em trong nhà (tên ở nhà, tháng/năm sinh, cấp độ Level 1–5, nhân vật đồng hành, ngôn ngữ gia đình, sở thích).
   - **Giáo án từng bài & Lộ trình 4 tuần/tháng**: câu tiếng Anh cha mẹ nói (có nút nghe chuẩn `0.85x` và nghe chậm `0.65x`), vật dụng chuẩn bị, kịch bản từng bước và trò chơi thực tế ngoài màn hình.
   - **In Flashcard & Phiếu hoạt động A4**: xuất trang in A4 gồm bộ thẻ từ cắt rời + kịch bản cha mẹ.
   - **Báo cáo 4 góc nhìn**: *1. Hôm nay & Mức độ tham gia*, *2. Tuần này*, *3. Theo kỹ năng (6 mức biểu hiện)*, *4. Gợi ý tiếp theo (cho phép Đổi / Bỏ qua gợi ý)*.

3. **Admin CMS ([LewAdminCms.tsx](file:///d:/MyEnglish/src/components/preschool/LewAdminCms.tsx) & [lewApi.mjs](file:///d:/MyEnglish/server/lewApi.mjs))**:
   - Quản trị động toàn bộ 5 nhóm tuổi, 36+ chủ đề, bài học, từ vựng, câu mẫu, trò chơi, truyện tranh, giáo án phụ huynh và thư viện media mà không cần sửa code.
   - Quy trình xuất bản: `Draft` → `Review` → `Published` → `Archived` (kiểm tra trường bắt buộc trước khi xuất bản; ưu tiên `Archive` thay vì xóa cứng nội dung đã có học viên học).
   - Phân quyền `admin`, `editor`, `viewer`, `user` (phụ huynh) và lưu nhật ký `lew_audit_logs`.

---

## 2. Cơ sở dữ liệu & API Contract (`/api/v1/*`)

- **Database**: SQLite (`data/myenglish.db`), tự động khởi tạo schema và seed từ [lewSeedData.json](file:///d:/MyEnglish/server/lewSeedData.json) ngay khi server khởi động.
- **OpenAPI 3.0 Spec**: Truy cập trực tiếp tại `GET /api/v1/openapi.json`.

### Các bảng SQLite chính của Little English World
- `lew_age_levels`: Cấu hình 5 nhóm tuổi (`level1`..`level5`).
- `lew_topics`: Chủ đề, bài học, từ vựng, truyện, trò chơi, giáo án phụ huynh, trạng thái xuất bản (`status`), `version`, cấu hình bật/tắt hoạt động (`enabled_activities_json`).
- `lew_media_assets`: Thư viện ảnh, audio, phiếu in kèm thông tin bản quyền (`license_note`).
- `lew_children`: Hồ sơ các bé gắn với `parent_email` (phân quyền cô lập dữ liệu từng gia đình).
- `lew_child_progress`: Tiến độ từng bài (`started | completed | skipped`), số lần nghe audio (`audio_replays`), số lần thử game (`game_attempts`), các bước đã thử (`activities_tried_json`), đánh dấu hoàn thành hoạt động ngoài màn hình (`offline_done`).
- `lew_observations`: Ghi nhận quan sát của phụ huynh (`recognized`, `understood`, `spoke`, `real_life`, `needs_review`, `not_observed`) và ghi chú.
- `lew_audit_logs`: Lịch sử thao tác CMS (`actor_email`, `actor_role`, `action`, `entity_type`, `entity_id`, `summary`, `created_at`).

---

## 3. Hướng dẫn Cài đặt & Chạy (Local / Staging / Production)

### Yêu cầu môi trường
- **Node.js >= 22.5** (khuyến nghị Node 22/24/26 có sẵn `node:sqlite`)
- **npm >= 9**

### Chạy môi trường Local Development
```powershell
# 1. Cài đặt dependencies
npm install

# 2. Tạo file .env từ mẫu (tùy chọn)
Copy-Item .env.example .env

# 3. Khởi động Backend API Server (cổng 3001)
npm run server

# 4. Khởi động Frontend Vite Dev Server (cổng 5173)
npm run dev
```

### Build & Chạy Production
```powershell
# Build TypeScript + Frontend bundle vào thư mục dist/
npm run build

# Khởi động Server phục vụ cả Frontend tĩnh + REST API /api/v1 trên cổng 3001
npm start
```

---

## 4. Tài khoản Demo & Kịch bản Nghiệm thu End-to-End

### Tài khoản Quản trị mặc định (được seed tự động)
- **Tài khoản Admin**: `admin` / Mật khẩu: `Admin@123`
- **Tài khoản Phụ huynh**: Đăng ký mới bất kỳ email `@gmail.com` tại màn hình Đăng ký và chọn lộ trình **Mầm non (1–6 tuổi)**.

### Kịch bản kiểm thử luồng End-to-End (Mục 16 Đặc tả)
1. **CMS tạo/chỉnh sửa bài học**:
   - Đăng nhập `admin` (`Admin@123`) → Mở **Little English World (1–6 tuổi)** → Vào **Góc Cha Mẹ & Giáo Án** → Bấm **CMS Quản Trị Nội Dung**.
   - Bấm **+ Tạo Chủ Đề / Bài Học Mới** (hoặc chọn 1 chủ đề hiện có) → Sửa từ vựng, truyện tranh, giáo án phụ huynh → Bấm **Xem trước bài học** → Chuyển trạng thái sang **Published**.
2. **Ứng dụng tải bài học & Phụ huynh đồng hành cùng bé**:
   - Quay lại màn hình **Thế giới của bé** → Chủ đề vừa xuất bản xuất hiện ngay trong danh sách.
   - Chuyển qua lại giữa 5 nhóm tuổi (`1–2 tuổi` hiển thị chế độ Cha Mẹ Dẫn Dắt; `3–4 tuổi` / `5–6 tuổi` hiển thị bài học tương tác).
   - Mở bài học → Trải nghiệm 6 bước, nghe phát âm chuẩn/chậm, chơi 6 trò chơi (bao gồm **Story Order — Xếp tranh kể chuyện**).
3. **Lưu tiến độ & Báo cáo phụ huynh**:
   - Tại Bước 6, phụ huynh tích chọn biểu hiện quan sát được của bé và nhập ghi chú → Bấm **Lưu tiến độ**.
   - Mở **Góc Cha Mẹ & Giáo Án** (vượt qua **Cổng Phụ Huynh `ParentGate`**) → Xem **Báo cáo Tiến bộ 4 góc nhìn**, bấm **In Flashcard & Phiếu A4**.

---

## 5. Hướng dẫn Backup & Restore (Cơ sở dữ liệu & Media)

### Sao lưu (Backup)
```powershell
# Sao lưu toàn bộ database SQLite và thư mục media upload
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
New-Item -ItemType Directory -Force -Path "backups/$stamp"
Copy-Item "data/myenglish.db*" "backups/$stamp/" -Force
if (Test-Path "data/lew-media") {
  Copy-Item "data/lew-media" "backups/$stamp/lew-media" -Recurse -Force
}
```

### Khôi phục (Restore)
1. Dừng tiến trình server (`npm start` / `npm run server`).
2. Copy file `myenglish.db` và thư mục `lew-media` từ bản backup vào lại thư mục `data/`.
3. Khởi động lại server bằng `npm start`.

---

## 6. Kiểm thử Tự động (Automated Integration Tests)

Chạy bộ test kiểm tra toàn bộ REST API `/api/v1/*`, phân quyền giữa các gia đình, quy trình xuất bản CMS và lưu tiến độ:

```powershell
node scripts/test-lew-api.mjs
```
