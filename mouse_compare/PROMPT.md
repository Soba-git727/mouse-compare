Role: Act as a Senior UI/UX Designer and Frontend Architect.
Project Overview: I am building a comprehensive "Gaming Mouse Comparison & Gear Database" web application. The platform is designed for gaming enthusiasts and gearheads who care deeply about hardware specs, weight, and ergonomics. The goal is to create a highly interactive, modern, and data-dense application that avoids feeling like a boring Excel spreadsheet.
Design Vibe & Theme:
•	Modern, sleek, "tech-enthusiast" aesthetic.
•	Dark Mode by default (Deep grays/blacks with vibrant accent colors for highlights).
•	High visual hierarchy: Use custom icons for specs (battery, connection waves, weight) instead of just text walls.
•	Mobile-First responsiveness is critical, especially for complex data tables.
Key Pages & Features to Design (Please provide detailed layout structures, UI component breakdowns, and UX flows for each):
1. The Comparison Matrix (Core Page)
•	Side-by-side comparison of 2 to 4 mice.
•	UX constraint on Mobile: Use horizontal swipe cards or an accordion toggle instead of squishing columns.
•	Sticky Header: Keep mouse images and names pinned at the top when scrolling down long spec lists.
•	Difference Toggle: A prominent switch to "Highlight Differences" between selected mice.
•	Educational Tooltips: Contextual hover popovers (Contextual Tooltips) for components. Example: Hovering over "PAW3395" or "100% PTFE" opens a small, elegant card explaining its benefit.
2. 2D Shape Overlay Visualizer (Killer Feature)
•	A dedicated interactive section where the SVG outlines of 2 mice are overlapped.
•	Controls to toggle Top View, Side View, and Back View.
•	Opacity sliders or color toggles for the overlay so users can see exactly where the hump or waist differs.
3. Hand Size & Grip Style Calculator (Interactive Tool)
•	Input fields for Hand Length and Width (in cm or mm).
•	Visual selectors for Grip Style: Palm, Claw, Fingertip (use illustrative icons).
•	A "Calculate/Find" button that transitions smoothly into a grid of recommended mice matching their specific profile.
4. Community & Review System
•	Editor's Tier List: A visual grid categorizing mice (e.g., "Best for FPS", "Top Ultra-lightweight").
•	Multi-Metric Review Cards: User review UI that breaks down scores into Build Quality, Coating, and Click Feel, rather than just a generic 5-star rating. Include a "Verified Owner" badge.
5. User Profile & Auth (Guest-First Approach)
•	Virtual Gear Desk: A personalized dashboard where users can manage their "Owned" mice and their "Wishlist".
•	Saved Comparisons: Quick access cards to resume past comparison sessions.
6. Admin Moderation Dashboard (Clean & Functional)
•	A minimalist backend layout featuring a Sidebar menu.
•	A "Moderation Queue" data table for approving/rejecting user-submitted specs or reviews.
•	Quick stat widgets (DAU, Most compared mice).
7. •  Data Import: Add a Bulk Import Feature (CSV/JSON) and an Automated Scraper API endpoint in the Admin panel to handle the initial seeding of 100+ mice without manual row-by-row entry.
•  Empty State CTA Pattern: In the search bar and Comparison Picker modal, if a query yields no results, display an engaging Empty State card:
"Can't find the mouse you're looking for? Log in to request or contribute specs for [Searched Term]!"
•  Two-Tier Contribution Flow:
•	Quick Request: User inputs Mouse Name + Brand + Product Link (Admin fills specs).
•	Full Contribution: Gearheads/Modders fill the full spec form to earn a "Contributor" badge.
8.About mouse shape Data:
Role: Act as a Senior Software Engineer specializing in Data Pipelines and Backend Automation.

Task:
Build a multi-source data ingestion module for the "GearForge" mouse database platform. The module should collect mouse specifications, 2D SVG outlines, and high-resolution images from both official manufacturer channels (Press Kits, Public APIs) and authorized public web resources.

Requirements & Architecture:

1. Data Source Strategy:
   - Primary Source (Official & Open Assets): Parse official manufacturer press kits, media portals (Razer, Logitech, Pulsar, Lamzu, etc.), and public open-source specs/SVG repositories on GitHub.
   - Secondary Source (Web Ingestion): Implement a polite HTTP fetcher to collect publicly available spec data and image links from standard product pages.

2. Ethical & Robust Ingestion Practices (Avoiding Rate Limits & Blocks):
   - Respect Site Policies: Check and respect `robots.txt` rules and standard rate limits.
   - Rate Limiting & Backoff: Implement polite request throttling (e.g., 2–4 seconds delay between requests) and Exponential Backoff for HTTP 429/503 responses.
   - Custom User-Agent: Include standard, identifiable HTTP headers (e.g., `User-Agent: GearForgeBot/1.0 (+https://gearforge.dev/bot)` or standard desktop browser headers).
   - Error Handling: Ensure individual request failures or missing assets do not halt the batch execution. Log errors gracefully to a file.

3. Asset Processing & Storage:
   - Auto-create `./public/assets/mice/` directory structure.
   - Download and save product images locally using clean slug filenames (e.g., `razer-viper-v3-pro-top.png`).
   - Store normalized metadata and SVG paths in a unified `mice_database.json` file.

4. Output Schema (`mice_database.json`):
   [
     {
       "id": "razer-viper-v3-pro",
       "name": "Viper V3 Pro",
       "brand": "Razer",
       "source_type": "official_press_kit", // or "web_ingestion"
       "dimensions": {
         "length_mm": 127.0,
         "width_mm": 63.9,
         "height_mm": 39.9
       },
       "weight_g": 54,
       "sensor": "Focus Pro 35K",
       "svg_path_top": "M100 20 C120...",
       "images": {
         "top_view": "/assets/mice/razer-viper-v3-pro-top.png"
       }
     }
   ]

Deliverables:
1. Complete Python script (`ingest_mice_data.py`).
2. `requirements.txt` file (e.g., `httpx`, `beautifulsoup4`, `pydantic`).
3. Execution instructions and guidelines for seeding initial data safely.
Output Request: Please start by providing the Detailed Wireframe Structure (Header, Main Body, Sidebar, Footer) for the Comparison Matrix and the 2D Shape Overlay Visualizer, specifying how the UI adapts from Desktop to Mobile. Suggest specific typography (e.g., Inter, Roboto Mono for data) and interactive micro-animations.

  
 
 
