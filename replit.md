# غيداء البادية (Ghaida Al-Badia)

## Overview
A professional Arabic RTL landing page for "غيداء البادية" - a company specializing in importing poultry farm equipment and veterinary medicines in Saudi Arabia. Includes a dynamic News section, Gallery, and Admin panel for content management.

## Architecture
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with custom color palette
- **Animations**: Framer Motion for scroll-triggered animations
- **Font**: Cairo (Arabic-optimized Google Font, loaded via CSS @import)
- **Auth**: iron-session (cookie-based session management)
- **File Uploads**: Next.js API route with formidable (saved to public/uploads/)
- **Data Fetching**: TanStack Query (React Query v5)

## Database Tables
- `users` - Admin users (id, username, password, is_admin)
- `news` - News articles (id, title, content, image_url, created_at)
- `gallery_images` - Gallery images (id, image_url, caption, created_at)

## Project Structure
- `app/layout.tsx` - Root layout (RTL, Cairo font, Providers)
- `app/page.tsx` - Landing page composing all sections
- `app/login/page.tsx` - Admin login page
- `app/admin/page.tsx` - Admin dashboard (News + Gallery management)
- `app/not-found.tsx` - 404 page
- `app/globals.css` - Global styles with Tailwind and CSS variables
- `app/providers.tsx` - QueryClientProvider wrapper
- `app/api/auth/login/route.ts` - Login API (iron-session)
- `app/api/auth/logout/route.ts` - Logout API
- `app/api/auth/me/route.ts` - Current user API
- `app/api/news/route.ts` - News CRUD (GET, POST)
- `app/api/news/[id]/route.ts` - News item (GET, PATCH, DELETE)
- `app/api/gallery/route.ts` - Gallery CRUD (GET, POST)
- `app/api/gallery/[id]/route.ts` - Gallery item (DELETE)
- `app/api/upload/route.ts` - File upload API
- `components/landing/` - Landing page section components:
  - `Navbar.tsx` - Fixed navigation with mobile menu
  - `Hero.tsx` - Hero section with background image
  - `About.tsx` - Company info, vision, and mission
  - `Services.tsx` - Four service cards with images
  - `Products.tsx` - Three product category cards
  - `Features.tsx` - Why choose us section (dark bg)
  - `Gallery.tsx` - Dynamic image gallery (fetches from /api/gallery)
  - `News.tsx` - Dynamic news section (fetches from /api/news)
  - `Contact.tsx` - Contact info + form
  - `Footer.tsx` - Footer with links, social, newsletter
- `components/ui/` - shadcn/ui components
- `hooks/` - Custom React hooks (use-toast, use-mobile)
- `lib/session.ts` - iron-session configuration
- `lib/auth-helpers.ts` - Password hashing utilities
- `lib/auth.ts` - useAuth hook for client-side auth
- `lib/queryClient.ts` - TanStack Query client + apiRequest helper
- `lib/utils.ts` - Utility functions (cn)
- `server/db.ts` - Drizzle ORM + pg pool
- `server/storage.ts` - DatabaseStorage class with full CRUD
- `server/seed.ts` - Seeds admin user + sample data
- `shared/schema.ts` - Database schema definitions
- `public/images/` - Static images (logo, hero, services, etc.)
- `public/uploads/` - User-uploaded images

## API Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user
- `GET /api/news` - List news
- `POST /api/news` - Create news (admin)
- `PATCH /api/news/:id` - Update news (admin)
- `DELETE /api/news/:id` - Delete news (admin)
- `GET /api/gallery` - List gallery images
- `POST /api/gallery` - Add gallery image (admin)
- `DELETE /api/gallery/:id` - Delete gallery image (admin)
- `POST /api/upload` - Upload image file (admin)

## Default Admin
- Username: admin
- Password: admin123

## Color Palette
- Navy: `#1A4B75` (primary brand)
- Blue: `#3594C4` (accent)
- Green: `#6CA741` (secondary accent)
- Red: `#C53026` (highlight)
- Light BG: `#F4F8FA`

## Running
The "Start application" workflow runs `next dev -p 5000` which starts the Next.js dev server.
