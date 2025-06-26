# Linker Frontend

Linker is a modern web app that lets users create an account, log in, and manage their saved links. Built using **React**, **Vite**, and **Tailwind CSS**, the app interacts with a secure backend to authenticate users and display personalized content.

## 🔗 Live Features

- ✅ User registration & login
- ✅ Home page showing all saved links
- ✅ Create new links (URL + metadata)
- ✅ View individual link details
- ✅ Authenticated routes using JWT tokens
- ✅ Global state management with `useContext`
- ✅ Persistent login with localStorage
- ✅ Clean UI with Tailwind

## 🧪 Stack Used

- **React + Vite**
- **Tailwind CSS**
- **Axios**
- **React Router**
- **React Toastify**
- **Context API** for auth state
- **JWT** (via backend)

## 📁 Pages

| Route            | Description                        |
|------------------|------------------------------------|
| `/register`      | Register a new user                |
| `/login`         | Login for existing users           |
| `/create-link`   | Add a new link                     |
| `/link/:linkId`  | View a single link in detail       |
| `/home`          | All links of the authenticated user|
| `/`              | Main Page                          |


## 🚀 Getting Started (GitHub Setup)

### 1. Clone the Repository
**Should Have Node Installed**

```bash
git clone https://github.com/ShadowAdi/linker_frontend.git
cd frontend

2. Install Dependencies

npm install

4. Start the Development Server

npm run dev

The app should now be running on: http://localhost:5173


🌐 API Base URL

Make sure your constants/BASE_URL.ts points to the correct backend:

export const BASE_URL = "http://localhost:3000/api/";

🔒 Auth Flow

JWT is stored in localStorage

Context provides access to getToken() and auth state

All protected requests use the token in Authorization header
