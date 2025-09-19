# 💬 ChatApplication – Simple Nightlight Dashboard & Real-Time Chat
✨ Project Overview

## ✨ Project Overview

ChatApplication is a simple, single-page web application designed for real-time messaging. It features a clean night-mode dashboard with a chat interface where users can exchange messages seamlessly. Each chat message shows a small progress indicator for delivery status, giving a subtle visual cue for message flow. The UI is minimalist, responsive, and optimized for readability in low-light environments.

## 🧪 Tech Stack Used

# Frontend

Framework: **Next.js** (with App Router)

Language: **TypeScript**

UI: **React.js**, **Tailwind CSS**, **Shadcn/ui**

## 🔍 Features
1. 🌙 Nightlight Dashboard

Single-page layout with dark theme for eye comfort

Responsive design for mobile and desktop

2. 💬 Real-Time Chat

Users can send and receive messages instantly

Each message includes a circular avatar and a colored progress bar to indicate status

3. 🎨 Minimal & Clean UI

Focus on readability and simplicity

Tailwind CSS + shadcn components for consistent styling

## install process

```bash

git clone https://github.com/nafis200/Chat-app-task


```

# node version must be need above 20.22.0

```bash

cd Chat-app-task

```

2. Install Dependencies
``` bash
npm install

```

3. Run the Development Page

```
npm run dev

```

## folder sturcture

```
ChatApplication/
├── .env.local               # Environment variables (NEXT_PUBLIC_API, etc.)
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── next-env.d.ts            # Auto-generated for TS support
├── public/                  # Static assets (images, icons, etc.)
├── node_modules/            # Installed dependencies
├── package.json             # Project metadata and scripts
├── README.md                # Project documentation
└── src/
    ├── app/                 # Next.js pages & layout
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/          # All reusable UI components
    │   ├── module/
    │   │   └── Chat.Application.tsx
    │   ├── shared/
    │   │   └── Navbar.tsx
    │   └── sidebar/
    │       ├── app-sidebar.tsx
    │       ├── mode-toggle.tsx
    │       ├── nav-main.tsx
    │       ├── nav-projects.tsx
    │       ├── nav-user.tsx
    │       ├── team-switcher.tsx
    │       └── theme-provider.tsx
    ├── constants/           # Static constants 
     types
        ├── data.ts
        └── index.ts

```

# 👨‍💼 Author

## Nafis Ahamed📧 

Email: nafisahamed14@gmail.com🌐 Portfolio: https://portfoliouser.vercel.app/

Contact_No : ++880 1922208141(phone,whatsapp,telegram)



npm install three @react-three/fiber @react-three/drei gsap dat.gui
npm install --save-dev @types/three
