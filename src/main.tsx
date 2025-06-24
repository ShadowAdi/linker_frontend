import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login.tsx";
import AuthLayout from "./auth/AuthLayout.tsx";
import Register from "./auth/Register.tsx";
import Home from "./home/Home.tsx";
import AppLayout from "./home/AppLayout.tsx";
import CreateLink from "./home/CreateLink.tsx";
import LinkDetail from "./home/LinkDetail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="create-link" element={<CreateLink />} />
          <Route path="link/:linkId" element={<LinkDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
