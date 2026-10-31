# Minimalist Chat App — Client

A real-time chat application built with React, Redux Toolkit and Socket.IO. Users can add friends, chat one-to-one or in groups, share attachments, and see typing indicators and online status. An admin dashboard provides stats and management of users, chats and messages.

**Live demo:** https://minimalist-chat-app-client.vercel.app
**Backend repo:** [MINIMALIST_CHAT_APP_SERVER](https://github.com/vijayant-pandey/MINIMALIST_CHAT_APP_SERVER)

---

## Features

**Users**
- Sign up with avatar upload, log in / log out (JWT stored in an HTTP-only cookie)
- Search users and send friend requests
- Notification badge for pending friend requests; accept or reject from the notifications dialog

**Chat**
- One-to-one and group chats in real time (Socket.IO)
- Send images, audio, video and files (up to 5 per message)
- Typing indicators, online users and unread message alerts
- Infinite scroll for message history

**Groups**
- Create groups, rename them, add / remove members, leave or delete a group

**Admin dashboard** (`/admin`, protected by a secret key)
- Stats with charts (Chart.js): messages over the last 7 days, single vs group chats
- Tables of all users, chats and messages (MUI Data Grid)

## Tech Stack

| Area | Libraries |
|---|---|
| UI | React 18, Vite, Material UI, Framer Motion |
| State / data | Redux Toolkit, RTK Query, Axios |
| Real-time | Socket.IO client |
| Routing | React Router v6 |
| Charts / tables | Chart.js, react-chartjs-2, MUI X Data Grid |
| Other | react-hot-toast, react-helmet-async, moment, 6pp |

## Project Structure

```
src/
├── components/
│   ├── auth/        # ProtectRoute
│   ├── dialogs/     # Add member, confirm delete, file menu
│   ├── layout/      # AppLayout, AdminLayout, Header, loaders
│   ├── shared/      # Chat items, messages, attachments, tables
│   ├── specific/    # Chat list, search, notifications, new group, profile, charts
│   └── styles/
├── constants/       # Server URL, socket event names, colours
├── hooks/           # Socket event, error and mutation helpers
├── pages/           # Home, Chat, Groups, Login, NotFound, admin/*
├── redux/           # Store, RTK Query API, reducers, admin thunks
├── socket.jsx       # Socket.IO provider
└── App.jsx          # Routes
```

## Getting Started

### Prerequisites
- Node.js 18+
- The [backend server](https://github.com/vijayant-pandey/MINIMALIST_CHAT_APP_SERVER) running locally (default `http://localhost:3000`)

### Setup

```bash
git clone https://github.com/vijayant-pandey/MINIMALIST_CHAT_APP_CLIENT.git
cd MINIMALIST_CHAT_APP_CLIENT
npm install
```

Create a `.env` file in the project root:

```env
VITE_SERVER=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
```

The app runs at http://localhost:5173.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Deployment (Vercel)

The client is deployed on Vercel and the server on Render. Because they are on different domains, browsers that block third-party cookies would drop the login cookie. To avoid this, `vercel.json` proxies API and socket requests through the Vercel domain so the cookie is first-party:

```json
{ "source": "/api/:path*",       "destination": "https://<backend>.onrender.com/api/:path*" }
{ "source": "/socket.io/:path*", "destination": "https://<backend>.onrender.com/socket.io/:path*" }
```

In the Vercel project settings, set:

```env
VITE_SERVER=https://<your-vercel-domain>.vercel.app
```

Vercel rewrites don't support WebSockets, so the socket client uses the HTTP long-polling transport.

## Author

**Vijayant Pandey** — [GitHub](https://github.com/vijayant-pandey)
