# Architecture — MouseDB

```
══════════════════════════════════════════════════════════════════════════════
                        KIẾN TRÚC TỔNG THỂ MouseDB
══════════════════════════════════════════════════════════════════════════════

 TRÌNH DUYỆT (bạn)
      │
      │  truy cập http://localhost:3000
      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│  FRONTEND — Next.js 16  (port 3000)   = "View" layer                       │
│  ┌───────────────────┐   ┌──────────────┐   ┌─────────────────────────┐    │
│  │ src/app/* (10     │   │ src/components│  │ src/lib/AuthContext.tsx │    │
│  │ trang):           │   │ Navbar,      │  │ (giữ state đăng nhập,   │    │
│  │ / /login /mice    │──▶│ Footer,      │  │  fetch /api/...)        │    │
│  │ /mice/[id]        │   │ AuthModal,   │  └───────────┬─────────────┘    │
│  │ /reviews /compare │   │ HeroSlider,  │              │                   │
│  │ /visualizer       │   │ Featured...  │          fetch("/api/...")      │
│  │ /calculator       │   └──────────────┘              │                   │
│  │ /profile /admin   │                                 ▼                   │
│  └───────────────────┘                                                    │
│  next.config.ts: rewrites() → /api/:path* chuyển tiếp về :5123             │
│  ─ src/data/mice.ts: chỉ còn type `Mouse` + dữ liệu seed (export-catalog)  │
│    (các trang /compare /visualizer /calculator /profile /reviews /mice     │
│     đều đã fetch từ API `GET /api/mice`, KHÔNG còn đọc mice.ts tĩnh)       │
└───────────────────────────────────────┬────────────────────────────────────┘
                                        │  HTTP / JSON (qua proxy, cùng domain)
                                        ▼
┌────────────────────────────────────────────────────────────────────────────┐
│  BACKEND — ASP.NET Core 10  (port 5123)  = MVC không có View                │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Controllers (C) — nhận request, trả JSON                             │  │
│  │  AuthController     /api/auth        register · login · me · logout  │  │
│  │  MiceController     /api/mice        GET list (pagination) · detail  │  │
│  │                                       · POST create · PUT · DELETE   │  │
│  │                                       · POST pending (submit)        │  │
│  │  ReviewsController  /api/reviews     GET list (filter + pagination)  │  │
│  │                                       · GET mine · POST · PUT · DELETE│  │
│  │  UsersController    /api/users/count  số tài khoản (dashboard)       │  │
│  │  UploadController   /api/upload      POST ảnh (admin, 5MB, whitelist)│  │
│  └──────────────────────────┬───────────────────────────────────────────┘  │
│                             ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Services — logic nghiệp vụ                                           │  │
│  │  MouseService (CRUD + seed + pagination)                             │  │
│  │  ReviewService (CRUD + filter + pagination + ownership)              │  │
│  │  MouseSubmissionService (hàng đợi pending)                           │  │
│  │  (+ Identity: UserManager/RoleManager)                               │  │
│  └──────────────────────────┬───────────────────────────────────────────┘  │
│                             ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Data — EF Core (ORM)                                                 │  │
│  │  AppDbContext  →  bảng: AspNetUsers, AspNetRoles, Mice, Reviews,     │  │
│  │                     MouseSubmissions ...                             │  │
│  │  Models/: Mouse, Review, MouseSubmission, AppUser + DTOs             │  │
│  │  Mappings/MouseMapper.cs (entity ↔ DTO)                              │  │
│  └──────────────────────────┬───────────────────────────────────────────┘  │
│                             ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ SQLite — file mouse_compare.db                                       │  │
│  │ (user, review, mouse, submission; EF Migrations quản lý schema)      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

```
══════════════════════════════════════════════════════════════════════════════
  CHUẨN HOÁ LỖI API + VALIDATION + PAGINATION (thêm ở Giai đoạn 3)
══════════════════════════════════════════════════════════════════════════════

 · Validation: DataAnnotations trên DTO (RegisterRequest, LoginRequest,
   CreateReviewRequest, UpdateReviewRequest, MouseRequest, SubmitMouseRequest)
   — [Required], [Range(1..10)], [StringLength], [EmailAddress], [Url].

 · Mọi lỗi API trả JSON { "error": "..." }:
   - Model validation → InvalidModelStateResponseFactory (Program.cs)
   - Exception chưa xử lý → UseExceptionHandler → 500 JSON {error}
     (không còn HTML 500 raw).

 · Pagination:
   - GET /api/mice?page=&pageSize=        (pageSize tối đa 200)
   - GET /api/reviews?page=&pageSize=&mouseId=
   - GET /api/reviews/mine?page=&pageSize=
   Trả về: { mice/reviews, total, page, pageSize }
   - Frontend: /mice (12/trang), /reviews (9/trang) có nút Prev/Next.

══════════════════════════════════════════════════════════════════════════════
  VÍ DỤ 1 LUỒNG CỤ THỂ — NGƯỜI DÙNG GỬI REVIEW
══════════════════════════════════════════════════════════════════════════════

 1. Bạn gõ review trong /reviews
 2. reviews/page.tsx  ──fetch POST /api/reviews──▶  Next (3000)
 3. rewrite()  ───────────────────────────────────▶  ASP.NET (5123)
 4. ReviewsController.Create:
      · [Authorize] → đọc cookie auth-token → xác minh JWT
      · ModelState validation (Required, Range 1-10) — lỗi trả 400 {error}
      · lấy userId/userName từ claims
      · ReviewService.Create → EF Core → INSERT vào SQLite
      · trả về 201 { "review": {...} }
 5. JSON quay ngược:  Next(3000) → reviews/page.tsx
 6. UI thêm review mới vào danh sách (không cần tải lại trang)

══════════════════════════════════════════════════════════════════════════════
  NẾU NHÌN THEO MÔ HÌNH MVC
══════════════════════════════════════════════════════════════════════════════
      Model        →  Models/  + Data/AppDbContext (SQLite)
      View         →  src/app/ + src/components/   (Next.js)
      Controller   →  Controllers/ + Services/     (ASP.NET)

  (M, C, V nằm ở 2 project khác nhau nhưng nối với nhau bằng HTTP/JSON proxy)
══════════════════════════════════════════════════════════════════════════════
  CẤU TRÚC THƯ MỤC (đã thay đổi ở Giai đoạn 1→3)
══════════════════════════════════════════════════════════════════════════════

 frontend (Next.js):
   src/app/            → page.tsx (10 trang) + layout.tsx + globals.css
   src/app/mice/[id]/  → trang chi tiết 1 chuột (thông số + ảnh + review)
   src/app/admin/      → dashboard + tab Mice (CRUD + upload ảnh) +
                         tab Reviews (xem/sửa/xoá mọi review) +
                         tab Moderation Queue + Import + Settings
   src/components/     → Navbar, Footer, AuthModal, HeroSlider, Featured...
   src/lib/AuthContext.tsx → context đăng nhập toàn cục
   src/data/mice.ts    → type Mouse + dữ liệu seed (không còn là nguồn chạy)

 backend (ASP.NET Core 10):
   Controllers/    → Auth, Mice, Reviews, Users, Upload
   Services/       → MouseService, ReviewService, MouseSubmissionService
   Models/         → entity (Mouse, Review, MouseSubmission, AppUser) + DTOs
   Mappings/       → MouseMapper.cs
   Data/           → AppDbContext.cs + SeedData/catalog-seed.json
   Migrations/     → InitialCatalog (dotnet-ef)

 khác:
   public/assets/mice/photos/  → ảnh chuột (upload qua /api/upload)
   scripts/export-catalog.js   → sinh catalog-seed.json từ src/data/mice.ts
   AGENT.md                    → bảng theo dõi yêu cầu (nguồn tham chiếu chính)
```
