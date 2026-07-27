# Bench - Electronics Workspace 🛠️⚡

> **⚠️ WORK IN PROGRESS (WIP)**  
> This project is currently under active development. Some features might be incomplete, and things are subject to change.

`Bench` is a clean, minimal dashboard and workspace designed for electronics enthusiasts, makers, and engineers. It helps track electronic projects, hardware components, schematics, and configurations in one centralized place.

---

## 🚀 Key Features

*   **Project Dashboard**: A quick overview of total projects and components, system status, and recent project files.
*   **Project Organization**: View list of ongoing projects with image uploads and detailed descriptions.
*   **Component Inventory**: Keep track of microchips, boards (Arduino, ESP32, Raspberry Pi), and other hardware parts.
*   **Database-backed**: Powered by Supabase for fast, reliable data persistence and retrieval.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Database & Storage**: [Supabase](https://supabase.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [FontAwesome](https://fontawesome.com/)
*   **Code Quality**: [Biome](https://biomejs.dev/)

---

## ⚙️ Getting Started

### Prerequisites

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1.  Clone the repository and install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Roadmap

- [x] Modern Dashboard Layout & Sidebar
- [x] Basic Project Database Integration
- [ ] Component Inventory Database & Management
- [ ] File/Image uploads to Supabase Storage
- [ ] Schematic and Pinout Quick Reference sheets
