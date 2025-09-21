# MovieExplorer

MovieExplorer is a modern web application for exploring, searching, and saving your favorite movies. Built with Next.js, TypeScript, Supabase, and NextAuth, it provides a seamless and interactive movie browsing experience.

## Features

- Browse and search for movies
- View detailed movie information
- User authentication (register, login, logout)
- Save favorite movies
- Responsive and modern UI

## Tech Stack

- Next.js (App Router)
- TypeScript
- Supabase (Database & Auth)
- NextAuth.js (Authentication)
- Tailwind CSS (Styling)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Supabase project (for database and authentication)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Inzamamdev/MovieExplorer.git
   cd movieexplorer
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   - Copy this to your `.env.local` and fill in your Supabase and NextAuth credentials.
   - Example:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your_nextauth_secret
     TMDB_API_KEY=your_api_key
     AUTH_GOOGLE_ID=Google cloud OAuth consent ID
     AUTH_GOOGLE_SECRET= Google cloud OAuth consent secret
     SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
     ```

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - Application routes and pages
- `src/components/` - Reusable UI components
- `src/config/` - Supabase configuration
- `src/context/` - React context for global state

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Deployment

You can deploy this app to Vercel or any platform that supports Next.js.

## License

MIT

---

Feel free to contribute or open issues for suggestions and bug reports!
