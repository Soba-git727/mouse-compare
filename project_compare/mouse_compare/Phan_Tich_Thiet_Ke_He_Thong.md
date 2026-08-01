# PHÂN TÍCH THIẾT KẾ HỆ THỐNG

## Đề tài: Xây dựng Web Application "So sánh & Tra cứu Chuột Gaming (MouseDB)"

---

## 1. GIỚI THIỆU ĐỀ TÀI

**MouseDB** là một ứng dụng web chuyên biệt dành cho cộng đồng game thủ và người đam mê phần cứng, cung cấp một kho dữ liệu chuột gaming (gaming mouse) với các chức năng cốt lõi:

- **So sánh chi tiết** 2–4 sản phẩm chuột theo thông số kỹ thuật (khối lượng, cảm biến, độ phân giải DPI, pin, switch...).
- **Trực quan hóa hình dạng (2D Shape Overlay)** — chồng 2 đường viền SVG của chuột lên nhau để quan sát sự khác biệt về hình dáng.
- **Máy tính kích cỡ tay & kiểu cầm** (Grip Calculator) — gợi ý sản phẩm phù hợp dựa trên kích thước bàn tay và kiểu cầm.
- **Hệ thống đánh giá (Review)** cộng đồng với thang điểm 1–10.
- **Phân hệ quản trị (Admin)** để quản lý danh mục chuột, duyệt review và nhập dữ liệu hàng loạt.

Hệ thống theo **mô hình client-server**, tách biệt Frontend (Next.js) và Backend (ASP.NET Core), giao tiếp qua HTTP/JSON.

---

## 2. MỤC TIÊU VÀ YÊU CẦU

### 2.1. Yêu cầu chức năng (trích)

| Mã | Chức năng |
|----|-----------|
| F1–F4 | Đăng ký, đăng nhập/đăng xuất, xem thông tin cá nhân, phân quyền User/Admin |
| F5–F9 | Xem danh sách chuột, xem chi tiết; Admin thêm/sửa/xoá chuột |
| F10–F15 | Viết review, xem review theo chuột, lịch sử review của mình, sửa/xoá review (ownership), Admin duyệt/xoá review |
| F16–F17 | Dashboard Admin (thống kê user/chuột/review), quản lý toàn bộ dữ liệu |
| F18–F21 | Trang chủ, danh sách & so sánh chuột, review cộng đồng, trang tài khoản |

### 2.2. Yêu cầu phi chức năng (trích)

| Mã | Yêu cầu |
|----|---------|
| N1–N3 | Mã hoá mật khẩu, xác thực JWT/Cookie, phân quyền |
| N6 | API phản hồi < 500ms |
| N8 | Khả năng chịu tải hàng nghìn chuột, vạn review (có phân trang) |
| N10 | Lỗi server không làm sập giao diện (trả JSON lỗi chuẩn) |
| N11–N12 | Modular frontend/backend, tài liệu API (Swagger/OpenAPI) |
| N17 | Validation đầu vào hai chiều (server + client) |
| N19–N21 | Giao diện responsive, feedback rõ ràng, tìm kiếm & lọc nhanh |

---

## 3. KIẾN TRÚC TỔNG THỂ

### 3.1. Sơ đồ luồng

```
TRÌNH DUYỆT (Client)
      │  http://localhost:3000
      ▼
┌───────────────────────────────────────────────────────────────┐
│  FRONTEND — Next.js 16 (port 3000)   = Lớp View               │
│  • src/app/*   : 10 trang SPA (/, /login, /mice, /mice/[id],  │
│                   /reviews, /compare, /visualizer, /calculator,│
│                   /profile, /admin)                            │
│  • src/components : Navbar, Footer, AuthModal, HeroSlider...   │
│  • src/lib/AuthContext.tsx : trạng thái đăng nhập toàn cục     │
│  • next.config.ts: rewrites() → /api/* chuyển về :5123         │
└───────────────────────────────┬───────────────────────────────┘
                                │ HTTP/JSON (qua proxy, cùng domain)
                                ▼
┌───────────────────────────────────────────────────────────────┐
│  BACKEND — ASP.NET Core 10 (port 5123)  = MVC không có View    │
│  ┌─────────────── Controllers (C) ────────────────┐            │
│  │ Auth /api/auth        register · login · me · logout        │
│  │ Mice /api/mice        GET list+detail · POST · PUT · DELETE │
│  │ Reviews /api/reviews  GET list · mine · POST · PUT · DELETE │
│  │ Users /api/users/count  thống kê số tài khoản              │
│  │ Upload /api/upload   upload ảnh chuột (admin)              │
│  └───────────────────────────┬───────────────────────────────┘ │
│  ┌─────────────── Services (logic nghiệp vụ) ──────────────┐   │
│  │ MouseService · ReviewService · MouseSubmissionService    │   │
│  │ (+ Identity: UserManager/RoleManager/SignInManager)     │   │
│  └───────────────────────────┬─────────────────────────────┘   │
│  ┌─────────────── Data — EF Core (ORM) ───────────────────┐    │
│  │ AppDbContext → AspNetUsers, AspNetRoles, Mice,          │    │
│  │               Reviews, MouseSubmissions                 │    │
│  └───────────────────────────┬─────────────────────────────┘    │
│  ┌─────────────── SQLite (mouse_compare.db) ───────────────┐    │
│  │ EF Migrations quản lý schema · Seed dữ liệu tự động      │    │
│  └──────────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────┘
```

### 3.2. Đặc điểm kiến trúc

- **Monolith tách lớp theo MVC**: M (Model) — C (Controller + Service) — V (View) nằm ở hai project riêng biệt, kết nối qua HTTP/JSON.
- **Reverse proxy (rewrite)**: Next.js chuyển tiếp mọi request `/api/*` sang backend ASP.NET trên cùng domain, giúp tránh vấn đề CORS và giữ cookie xác thực same-origin.
- **Layers rõ ràng** trong backend: `Controllers → Services → Data (DbContext) → SQLite`, dễ mở rộng tính năng mới.
- **Frontend là SPA**: dữ liệu fetch client-side qua `fetch()`, không reload trang khi chuyển tab/thao tác.

---

## 4. THIẾT KẾ FRONTEND (Next.js 16)

### 4.1. Công nghệ & thư viện

| Thành phần | Công nghệ |
|------------|-----------|
| Framework | Next.js 16.2.11 (App Router) |
| Ngôn ngữ | TypeScript 5 |
| UI / Styling | Tailwind CSS 4, lucide-react (icons) |
| Font | Inter + Roboto Mono (dữ liệu dùng mono) |
| Biểu đồ | recharts 3 (dùng trong dashboard) |
| State toàn cục | React Context (`AuthContext`) |

### 4.2. Cấu trúc thư mục & các trang

```
src/
├── app/                  # App Router
│   ├── page.tsx          # Trang chủ (Hero, slider, featured mice)
│   ├── login/            # Đăng nhập / đăng ký
│   ├── mice/             # Danh sách chuột + tìm kiếm + phân trang
│   ├── mice/[id]/        # Chi tiết 1 chuột (thông số, ảnh, SVG, review)
│   ├── reviews/          # Review cộng đồng + lọc theo chuột
│   ├── compare/          # Bảng so sánh 2–4 chuột
│   ├── visualizer/       # Chồng SVG 2D (Top/Side/Back view)
│   ├── calculator/       # Grip Calculator
│   ├── profile/          # Tài khoản + lịch sử review
│   └── admin/            # Dashboard + quản trị (tabs)
├── components/           # Navbar, Footer, AuthModal, HeroSlider, Featured...
├── lib/AuthContext.tsx   # Context đăng nhập toàn cục
├── data/mice.ts          # Type `Mouse` + dữ liệu seed (sinh catalog)
└── hooks/useAuth.ts      # Hook tiêu thụ AuthContext
```

### 4.3. Các trang chức năng chính

1. **`/compare`** — Bảng so sánh:
   - Chọn 2–4 chuột qua dropdown có tìm kiếm.
   - Hàng loạt thông số với icon riêng (khối lượng, cảm biến, DPI, IPS, pin, switch...).
   - **Tooltip giáo dục**: hover vào cảm biến/switch hiển thị giải thích chi tiết.
   - **Toggle "Highlight Differences"**: làm nổi bật các ô giá trị khác nhau giữa các chuột.
   - Font mono cho dữ liệu số, layout responsive (cuộn ngang trên mobile).

2. **`/visualizer`** — Shape Overlay:
   - Chọn 2 chuột, chọn góc nhìn Top / Side / Back.
   - Hai SVG path được chồng lên nhau với **thanh trượt opacity** và **bảng chọn màu** riêng cho từng chuột, giúp quan sát chính xác vùng khác biệt về hình dáng.

3. **`/calculator`** — Grip Calculator:
   - Nhập chiều dài/chiều rộng bàn tay (cm), chọn kiểu cầm (Palm / Claw / Fingertip).
   - Hàm chấm điểm `computeMatch()` kết hợp 3 tiêu chí: khớp khoảng kích cỡ tay (40 điểm), khớp kiểu cầm (40 điểm), gần trọng lượng lý tưởng ~65g (25 điểm).
   - Kết quả là danh sách chuột xếp hạng theo % phù hợp.

4. **`/reviews`** — Review cộng đồng: dropdown lọc theo chuột, phân trang 9/trang, form viết review cho user đã đăng nhập.

5. **`/mice` & `/mice/[id]`** — Danh mục chuột: tìm kiếm client-side, phân trang 12/trang; trang chi tiết hiển thị thông số, hình dạng SVG, ảnh và review theo chuột.

6. **`/admin`** — Quản trị (chỉ Admin):
   - **Dashboard**: số user, chuột, review thật.
   - **Tab Mice**: form thêm/sửa/xoá chuột, upload ảnh.
   - **Tab Reviews**: xem/sửa/xoá mọi review (inline edit).
   - **Moderation Queue**: danh sách đề xuất chuột chờ duyệt.
   - **Data Import / Settings**: giao diện nhập dữ liệu hàng loạt.

7. **`/profile`** — Tài khoản: thông tin cá nhân + danh sách "My Reviews" (sửa/xoá).

### 4.4. Xử lý trạng thái & UX

- **AuthContext**: gọi `/api/auth/me` khi mount để khôi phục phiên đăng nhập; cung cấp `login/register/logout` cho toàn ứng dụng.
- **Feedback nhất quán**: mọi trang đều có trạng thái loading + error banner đỏ khi API fail, không làm sập UI.
- **Định dạng dữ liệu**: JSON trả về theo snake_case (`length_mm`, `grip_styles`...) khớp với interface `Mouse` trong `src/data/mice.ts`.

---

## 5. THIẾT KẾ BACKEND (ASP.NET Core 10)

### 5.1. Cấu trúc project

```
backend/AspNetCoreAuth/
├── Controllers/     # Nhận request, trả JSON (Auth, Mice, Reviews, Users, Upload)
├── Services/        # Logic nghiệp vụ (MouseService, ReviewService, MouseSubmissionService)
├── Models/          # Entity (Mouse, Review, MouseSubmission, AppUser) + DTOs
├── Mappings/        # MouseMapper (Entity ↔ DTO)
├── Data/            # AppDbContext + SeedData/catalog-seed.json
├── Migrations/      # InitialCatalog (EF Core)
└── Program.cs       # Cấu hình DI, Identity, JWT, CORS, seed
```

### 5.2. Nguyên tắc thiết kế

- **DI (Dependency Injection)**: interface + implementation (`IMouseService/MouseService`, `IReviewService/ReviewService`, `IMouseSubmissionService/MouseSubmissionService`) đăng ký scoped trong `Program.cs`.
- **MVC không có View**: các Controller chỉ trả JSON, đúng chuẩn Web API.
- **Mapper chuyên dụng**: `MouseMapper` chuyển đổi giữa entity và DTO theo quy ước snake_case ở tầng API, tách biệt model lưu trữ khỏi contract API.

### 5.3. Controllers & endpoints chính

| Controller | Route | Mô tả |
|------------|-------|-------|
| AuthController | `POST /api/auth/register` | Đăng ký, gán role User, đặt cookie JWT |
| | `POST /api/auth/login` | Đăng nhập, sinh JWT, đặt cookie |
| | `GET /api/auth/me` | Lấy thông tin user từ JWT |
| | `DELETE /api/auth/me` | Đăng xuất (xoá cookie) |
| MiceController | `GET /api/mice` | Danh sách + phân trang (pageSize ≤ 200) |
| | `GET /api/mice/{id}` | Chi tiết 1 chuột |
| | `POST/PUT/DELETE` | CRUD — `[Authorize(Roles="Admin")]` |
| | `GET/POST /api/mice/pending` | Hàng đợi đề xuất chuột |
| ReviewsController | `GET /api/reviews` | Danh sách + lọc theo mouseId + phân trang |
| | `GET /api/reviews/mine` | Review của user đang đăng nhập |
| | `POST /api/reviews` | Tạo review — `[Authorize]` |
| | `PUT/DELETE /api/reviews/{id}` | Sửa/xoá — kiểm tra ownership |
| UsersController | `GET /api/users/count` | Số tài khoản (dashboard) |
| UploadController | `POST /api/upload` | Upload ảnh (admin, tối đa 5MB, whitelist extension) |

---

## 6. THIẾT KẾ CƠ SỞ DỮ LIỆU

### 6.1. Công nghệ

- **SQLite** (file `mouse_compare.db`) — phù hợp với quy mô đề tài, zero-config.
- **Entity Framework Core 10** làm ORM, **Migrations** quản lý schema (`dotnet ef migrations add` + `db.Database.Migrate()` tự chạy khi khởi động).

### 6.2. Các bảng

| Bảng | Mô tả |
|------|-------|
| `AspNetUsers` | Người dùng (kế thừa `IdentityUser`, thêm cột `Avatar`) |
| `AspNetRoles` / `AspNetUserRoles` | Vai trò User / Admin |
| `Mice` | Danh mục chuột (~28 trường thông số) |
| `Reviews` | Đánh giá (userId, userName, mouseId, mouseName, text, rating 1–10) |
| `MouseSubmissions` | Đề xuất chuột chờ duyệt (name, brand, link, submittedBy) |

### 6.3. Thiết kế entity `Mouse`

Lưu đầy đủ thông số kỹ thuật phục vụ so sánh:

- Kích thước: `LengthMm`, `WidthMm`, `HeightMm`, `Dimensions`.
- Hiệu năng: `Sensor`, `Dpi`, `Ips`, `Acceleration`.
- Phần cứng: `Switches`, `Battery`, `Buttons`, `Connection`, `Coating`.
- Công thái học: `Ergonomic`, `HandSizeMin/Max`, `GripStyles[]`.
- Đồ hoạ: `Photo`, `Colors[]`, `Images` (Top/Side), `ShapeSvg` (Top/Side/Back path).

**Xử lý dữ liệu phức tạp**: `ShapeSvg` và `Images` là các object phức tạp được lưu dưới dạng **JSON** thông qua `HasConversion` trong `AppDbContext` — EF Core tự serialize/deserialize, giúp linh hoạt mà không cần tạo bảng phụ.

### 6.4. Seed dữ liệu

- Tệp `Data/SeedData/catalog-seed.json` chứa danh mục chuột ban đầu.
- Khi khởi động, `Program.cs` đọc JSON và gọi `MouseService.Seed()`:
  - Nếu chuột chưa tồn tại → thêm mới.
  - Nếu chuột đã tồn tại nhưng còn thiếu trường → **FillMissing** (điền bổ sung, không ghi đè dữ liệu có sẵn).
- Tệp JSON được sinh tự động từ `src/data/mice.ts` qua script `npm run export-catalog`.

---

## 7. THIẾT KẾ XÁC THỰC & PHÂN QUYỀN

### 7.1. Luồng xác thực

1. User gửi email + mật khẩu → `/api/auth/login`.
2. Backend kiểm tra mật khẩu bằng **ASP.NET Identity** (`SignInManager`).
3. Sinh **JWT** (HS256) chứa claims: `NameIdentifier`, `Email`, `Role`, `name`, hết hạn 7 ngày.
4. Token được đặt vào **Cookie `auth-token`** (HttpOnly, SameSite=Lax) → trình duyệt tự động gửi kèm mỗi request.
5. Middleware JWT (`OnMessageReceived`) đọc token từ cookie thay vì header Authorization → **hoạt động xuyên proxy** vì cùng domain.

### 7.2. Mã hoá mật khẩu

- Sử dụng ASP.NET Identity, mật khẩu được băm (hash) bằng thuật toán chuẩn — không bao giờ lưu plain text.

### 7.3. Phân quyền (Authorization)

| Mức | Cơ chế | Ví dụ |
|-----|--------|-------|
| Role-based | `[Authorize(Roles="Admin")]` | CRUD chuột, upload ảnh |
| Authenticated | `[Authorize]` | Tạo review, xem review của mình |
| Ownership | Kiểm tra thủ công trong Controller | Sửa/xoá review: chỉ chủ sở hữu hoặc Admin (`review.UserId != userId && !User.IsInRole("Admin")` → 403 Forbid) |

### 7.4. Khởi tạo Admin

- Khi khởi động, nếu role `Admin`/`User` chưa tồn tại → tự tạo.
- Nếu tài khoản admin mặc định (`admin@mousecompare.com`) chưa có → tự seed kèm gán role Admin.
- Thông tin cấu hình qua `appsettings.json`.

---

## 8. XỬ LÝ LỖI & VALIDATION (CHUẨN HOÁ)

### 8.1. Validation hai chiều

- **Server**: DataAnnotations trên DTO (`[Required]`, `[Range(1,10)]`, `[StringLength]`, `[EmailAddress]`, `[Url]`). Lỗi model → `InvalidModelStateResponseFactory` trả về **JSON `{error}`** thay vì HTML.
- **Client**: kiểm tra trước khi submit + hiển thị banner lỗi.

### 8.2. Xử lý exception

- `UseExceptionHandler` chặn mọi ngoại lệ chưa xử lý → trả **500 JSON `{error}`**, không lộ stack trace ra client.
- Mọi API đều trả định dạng lỗi nhất quán `{ "error": "..." }`.

### 8.3. Phân trang (Pagination)

- `GET /api/mice?page=&pageSize=` (tối đa 200/trang), `GET /api/reviews?page=&pageSize=&mouseId=`, `GET /api/reviews/mine?page=&pageSize=`.
- Response chuẩn: `{ items, total, page, pageSize }`.
- Frontend: `/mice` 12/trang, `/reviews` 9/trang, có nút Prev/Next → đáp ứng N8 (chịu tải hàng nghìn bản ghi).

---

## 9. BẢO MẬT

| Vấn đề | Giải pháp |
|--------|-----------|
| Mật khẩu | Băm bằng ASP.NET Identity |
| Phiên | JWT trong cookie HttpOnly (chống XSS đọc token) |
| CSRF | Cookie SameSite=Lax |
| Upload ảnh | Chỉ Admin; whitelist extension (.jpg/.png/.gif/.webp); giới hạn 5MB; tên file ngẫu nhiên hoá bằng GUID |
| Lộ dữ liệu | Log mức Warning; error message được kiểm soát |
| ID injection | Không dùng đường dẫn file từ input người dùng (dùng GUID cho tên file upload) |

---

## 10. CÔNG CỤ HỖ TRỢ DỮ LIỆU (Data Ingestion)

Ngoài hệ thống web, đề tài kèm module nhập dữ liệu tự động `ingest_mice_data.py`:

- **Nguồn dữ liệu**: official press kit (MOUSE_DB chuẩn hoá) + web ingestion (scrape bảng thông số qua BeautifulSoup).
- **Ứng xử lịch sự (polite crawling)**: custom `User-Agent` (`GearForgeBot/1.0`), delay 3s giữa các request, Exponential Backoff khi gặp HTTP 429/503.
- **Chống lỗi gián đoạn**: mỗi request fail được log riêng, không dừng cả batch.
- **Lưu trữ chuẩn hoá**: sinh `mice_database.json` + thư mục `public/assets/mice/` với tên file slug.

---

## 11. ĐÁNH GIÁ THEO YÊU CẦU PHI CHỨC NĂNG

| Yêu cầu | Trạng thái | Ghi chú |
|---------|-----------|---------|
| Modular frontend/backend | ✅ | 2 project tách biệt |
| Tài liệu API | ✅ | Swagger/OpenAPI `/openapi/v1.json` qua proxy |
| API phản hồi nhanh | ✅ | SQLite local, < 500ms |
| Chịu tải | ✅ | Phân trang toàn bộ danh sách |
| Lỗi không crash UI | ✅ | JSON `{error}` + error banner |
| Responsive | ✅ | Tailwind, mobile-friendly |
| Validation | ✅ | Server + client |
| HTTPS production | ⬜ | Cần cấu hình khi deploy |
| Backup DB | ⬜ | Cần chiến lược backup |
| Real-time | ⬜ | Tuỳ chọn mở rộng |

---

## 12. KẾT LUẬN VÀ ĐỊNH HƯỚNG PHÁT TRIỂN

### 12.1. Điểm mạnh của thiết kế

1. **Kiến trúc sạch, phân tầng rõ ràng** — dễ bảo trì, dễ thêm tính năng (đã chứng minh qua 4 giai đoạn phát triển).
2. **Trải nghiệm so sánh chuyên sâu** — tooltip giáo dục, highlight khác biệt, shape overlay trực quan giúp ứng dụng không bị "khô khan như bảng tính".
3. **Bảo mật nền tảng vững chắc** — JWT + Identity + cookie HttpOnly + ownership check + validation chuẩn.
4. **Dữ liệu linh hoạt** — entity `Mouse` giàu thông số; `ShapeSvg`/`Images` lưu JSON giúp linh hoạt lược đồ.
5. **Seed & ingestion tự động** — giảm công sức nhập liệu, hỗ trợ mở rộng kho dữ liệu.

### 12.2. Hạn chế hiện tại

1. **Chưa có HTTPS và chiến lược deploy** — chỉ chạy local/dev.
2. **Chưa có backup DB** — rủi ro mất dữ liệu.
3. **Chưa có real-time updates** (VD: thông báo khi review mới).
4. Dashboard còn một số số liệu demo (DAU) chưa nối dữ liệu thật.

### 12.3. Định hướng phát triển

1. Triển khai production: HTTPS, CDN cho frontend, load balancer cho backend, monitor uptime.
2. Chiến lược backup DB định kỳ.
3. Mở rộng dữ liệu: kết nối module ingestion tự động, tăng số lượng chuột lên hàng trăm sản phẩm.
4. Thêm tính năng: giỏ chuột sở hữu (Owned/Wishlist), lưu phiên so sánh, badge "Verified Owner" cho review.

---

*Tài liệu được tổng hợp từ mã nguồn thực tế của dự án MouseDB (thư mục `project_compare/mouse_compare`), phục vụ báo cáo đề tài.*
