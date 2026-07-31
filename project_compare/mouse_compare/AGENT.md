# AGENT.md — MouseDB: Hiện trạng + Bảng theo dõi yêu cầu + Kế hoạch

Tài liệu này là nguồn tham chiếu duy nhất về trạng thái dự án đối với
**toàn bộ Yêu cầu Chức năng + Phi chức năng + Công nghệ**. Khi hoàn thành
một mục, cập nhật trạng thái tương ứng (✅ / 🔄 / ⬜).

## Kiến trúc hiện tại
```
Browser → Next.js :3000 (View) → rewrites /api/* → ASP.NET Core 10 :5123
          (Controllers → Services → AppDbContext → SQLite)
```
- Model: `Models/` + `Data/AppDbContext`
- View: `src/app/`, `src/components/` (Next.js)
- Controller: `Controllers/` + `Services/` (ASP.NET)
- Chi tiết luồng: xem `architecture.md`

## Môi trường & cách chạy
- Windows đã cài **.NET SDK 10.0.302** tại `D:\dotnet-sdk` (dùng `/mnt/d/dotnet-sdk/dotnet.exe`; SDK 9.0.316 cũ vẫn ở `C:\Program Files\dotnet`).
- Chạy: `start.bat` hoặc `npm run dev:all` → API :5123 + WEB :3000 → `http://localhost:3000`.
- DB: SQLite `mouse_compare.db` (EF Migrations, tự tạo khi chạy lần đầu).
- Admin seed: `admin@mousecompare.com` / `admin123`.

---

# BẢNG THEO DÕI YÊU CẦU

## Chức năng

| # | Yêu cầu | Trạng thái | Ghi chú |
|---|---|---|---|
| F1 | Đăng ký tài khoản | ✅ | `/api/auth/register` |
| F2 | Đăng nhập / Đăng xuất | ✅ | `/api/auth/login` + `DELETE /api/auth/me`, JWT cookie |
| F3 | Xem thông tin cá nhân (me) | ✅ | `/api/auth/me`, role lowercase |
| F4 | Phân quyền User / Admin | ✅ | Role claim trong JWT, `[Authorize(Roles="Admin")]` |
| F5 | Xem danh sách chuột có sẵn | ✅ | `GET /api/mice` + trang `/mice` (tìm kiếm client-side) |
| F6 | Xem chi tiết 1 chuột (thông số, ảnh) | ✅ | `/api/mice/{id}` + trang `/mice/[id]` |
| F7 | Admin: thêm chuột mới | ✅ | `POST /api/mice` (admin) + form trong admin |
| F8 | Admin: sửa chuột | ✅ | `PUT /api/mice/{id}` (admin) + form trong admin |
| F9 | Admin: xoá chuột | ✅ | `DELETE /api/mice/{id}` (admin) |
| F10 | Viết review cho từng chuột (đã login) | ✅ | `POST /api/reviews` |
| F11 | Xem review của 1 chuột (công khai) | ✅ | `GET /api/reviews?mouseId=` + hiển thị trên `/reviews` và `/mice/[id]` |
| F12 | Xem lịch sử review của mình | ✅ | `GET /api/reviews/mine` + hiển thị ở `/profile` |
| F13 | Sửa review của mình | ✅ | `PUT /api/reviews/{id}` + ownership check (owner hoặc admin) |
| F14 | Xoá review của mình | ✅ | `DELETE /api/reviews/{id}` cho owner (admin vẫn xoá được bất kỳ) |
| F15 | Admin: xoá review không phù hợp | ✅ | `DELETE /api/reviews` (admin) |
| F16 | Dashboard admin: số user, chuột, review | ✅ | User/mouse/review đều hiển thị số thật |
| F17 | Admin: quản lý toàn bộ dữ liệu (CRUD) | ✅ | Mice CRUD ✅; tab "Reviews" riêng trong admin: xem/sửa/xoá mọi review (inline edit, loading/error state) |
| F18 | Trang chủ | ✅ | `/` |
| F19 | Trang danh sách chuột & so sánh | ✅ | `/compare` (đã migrate sang API `GET /api/mice`) |
| F20 | Trang review cộng đồng | ✅ | `/reviews` |
| F21 | Trang tài khoản | ✅ | `/profile` |

## Phi chức năng

| # | Yêu cầu | Trạng thái | Ghi chú |
|---|---|---|---|
| N1 | Mã hoá mật khẩu | ✅ | ASP.NET Identity |
| N2 | Xác thực JWT/cookie | ✅ | Cookie `auth-token`, `[Authorize]` |
| N3 | Phân quyền (admin-only, ownership) | ✅ | Admin-only ✅; ownership: sửa/xoá review chỉ chủ sở hữu (admin toàn quyền) |
| N4 | HTTPS production | ⬜ | Đang dev http; cấu hình khi deploy |
| N5 | Không lộ dữ liệu nhạy cảm trong log/error | ✅ | LogLevel Warning cho ASP.NET; error message đã kiểm soát |
| N6 | API response < 500ms | ✅ | SQLite local, chưa thấy nghẽn |
| N7 | SPA không reload trang | ✅ | Fetch client-side |
| N8 | Chịu được hàng nghìn chuột, vạn review | ✅ | Pagination: `GET /api/mice?page=&pageSize=` (tối đa 200/trang), `GET /api/reviews?page=&pageSize=` + `/mine`; `/mice` (12/trang) và `/reviews` (9/trang) có nút Prev/Next |
| N9 | Uptime ≥ 99% | ⬜ | Chưa có chiến lược deploy/monitor |
| N10 | Lỗi server không crash UI | ✅ | Mọi lỗi API trả JSON `{error}` (model validation + exception handler); frontend có error banner/bộ nhớ `.catch()` |
| N11 | Modular frontend/backend | ✅ | 2 project tách biệt |
| N12 | Tài liệu API (Swagger/OpenAPI) | ✅ | `/openapi/v1.json` truy cập qua proxy ở Development |
| N13 | EF Core migrations | ✅ | Migration `InitialCatalog` + `dotnet ef database update` |
| N14 | Dễ bổ sung feature mới | ✅ | Kiến trúc layers rõ ràng |
| N15 | Scale frontend (CDN) / backend (LB) độc lập | ✅ | Phù hợp kiến trúc hiện tại |
| N16 | Dữ liệu không bị mất (SQLite + backup) | ⬜ | Cần chiến lược backup |
| N17 | Validation đầu vào (server + client) | ✅ | DataAnnotations trên Register/Login/Review/Mouse/Submit DTO (Required, Range 1-10, StringLength, Email, Url); `InvalidModelStateResponseFactory` trả JSON `{error}` |
| N18 | Xử lý transaction an toàn | ✅ | `SaveChanges` nguyên tử từng request |
| N19 | Giao diện responsive | ✅ | Tailwind mobile-friendly |
| N20 | Feedback rõ ràng (loading/success/error) | ✅ | Loading + error state nhất quán: `/mice`, `/reviews`, `/profile`, `/admin`, `/compare`, `/visualizer`, `/calculator`; banner lỗi đỏ khi API fail |
| N21 | Tìm kiếm & lọc chuột nhanh | ✅ | `/mice` có search; `/compare` có filter |
| N22 | Real-time updates | ⬜ | Tuỳ chọn (ghi "nếu có") |

## Công nghệ
| Yêu cầu | Trạng thái |
|---|---|
| Frontend Next.js 16 | ✅ |
| Backend ASP.NET Core 10 | ✅ |
| Database SQLite | ✅ |
| Auth JWT + Identity | ✅ |
| ORM Entity Framework Core | ✅ |

---

# KẾ HOẠCH THEO GIAI ĐOẠN

## Giai đoạn 1 — "Chuột + CRUD" (ĐÃ XONG ✅)
Đã đóng F5→F9, F16, N13, N12, N21 (F17 đóng phần chuột CRUD).
- Backend: entity `Mouse` (catalog ~28 field) + `MouseSubmission`; `MouseService` (CRUD + seed), `MouseSubmissionService`; `MiceController` (list/detail/create/update/delete + `/api/mice/pending`); `MouseDto`/`MouseRequest` snake_case khớp `mice.ts`; mapper `Mappings/MouseMapper.cs`.
- Migrations: `InitialCatalog` (dotnet-ef), `Program.cs` dùng `db.Database.Migrate()` + seed catalog idempotent từ `Data/SeedData/catalog-seed.json` (sinh bằng `npm run export-catalog`).
- Frontend: trang `/mice` (tìm kiếm) + `/mice/[id]` (thông số, SVG shape, ảnh); admin tab "Mice" (thêm/sửa/xoá + modal form); navbar thêm link "Mice"; dashboard hiển thị số user/mouse/review thật.
- Xác minh: `dotnet build` 0 lỗi, curl CRUD + phân quyền (401/403) đạt, `tsc --noEmit` sạch, `next build` OK, `/openapi/v1.json` truy cập được.

## Giai đoạn 2 — "Review nâng cao" (ĐÃ XONG ✅)
Đã đóng F11→F14, N3 (ownership), F17 (tab Reviews riêng trong admin: xem/sửa/xoá mọi review).
- Backend: `GET /api/reviews?mouseId=` (lọc theo chuột), `GET /api/reviews/mine` (auth), `PUT /api/reviews/{id}` (owner/admin), `DELETE /api/reviews/{id}` (owner/admin). `ReviewService` thêm `GetAll(mouseId?)`, `GetMine`, `Find`, `Update`; bỏ `DeleteReviewRequest` body-cũ.
- Frontend: `/reviews` có dropdown lọc theo chuột, nút sửa/xoá trên review của mình (inline form, loading/error state); `/profile` thêm "My Reviews" (lịch sử + sửa/xoá); `/mice/[id]` hiển thị "Community Reviews" theo chuột; admin có tab "Reviews" riêng — xem toàn bộ review + sửa/xoá bất kỳ (inline form, loading/error state); xoá review ở moderation qua route `/{id}`.
- Xác minh: `dotnet build` 0 lỗi, curl (tạo → mine → filter → PUT owner 200 → PUT/DELETE của người khác 403 → admin sửa được → owner DELETE 200 → 401/404 đúng), `tsc --noEmit` sạch, `next build` OK, các trang render 200, admin tab "Reviews" load danh sách + PUT/DELETE qua API đạt.

## Giai đoạn 3 — "Phi chức năng & vận hành" (ĐÃ XONG ✅ một phần)
Đã đóng N8 (pagination), N10 (lỗi API JSON), N17 (validation), N20 (feedback).
- Pagination: `GET /api/mice?page=&pageSize=` + `GET /api/reviews?page=&pageSize=`; frontend `/mice` (12/trang) và `/reviews` (9/trang) có Prev/Next.
- Validation: DataAnnotations trên Register/Login/Review/Mouse/Submit; `InvalidModelStateResponseFactory` + exception handler trả JSON `{error}`.
- Feedback: loading + error banner nhất quán toàn bộ trang.

## Giai đoạn 4 — "Vận hành & nâng cao"
Còn lại: N4 (HTTPS), N9 (uptime/monitor), N16 (backup DB), N22 (real-time).
- HTTPS + deploy (CDN frontend / LB backend), chiến lược backup DB, monitor uptime.

---

## Rủi ro / lưu ý
- Chạy 2 server cùng lúc; `allowedDevOrigins` trong next.config.ts **không được ghi đè**.
- Cookie `auth-token` same-origin qua proxy — UI không đổi.
- Schema DB do Migrations quản lý: thêm/sửa model → `dotnet ef migrations add <tên>` + `dotnet ef database update`.
- Catalog tĩnh `src/data/mice.ts` đã được migrate toàn bộ sang API `GET /api/mice` (compare, visualizer, calculator, profile, reviews). File vẫn giữ làm source của type `Mouse` và dữ liệu seed cho `export-catalog`.
