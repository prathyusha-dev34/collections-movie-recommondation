import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotificationBell from "./components/NotificationBell";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import CollectionsPage from "./pages/CollectionsPage";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// =========================
// Protected Route
// =========================
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      {/* Navbar (only logged in) */}
      {token && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Navbar />

          {/* 🔔 Notification Bell */}
          <NotificationBell userId={1} />
        </div>
      )}

      <div style={{ display: "flex" }}>

        {/* Sidebar */}
        {token && <Sidebar />}

        <div style={{ flex: 1 }}>

          <Routes>

            {/* Default Route */}
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to="/home" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/movies"
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />

            <Route
              path="/collections"
              element={
                <ProtectedRoute>
                  <CollectionsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />

            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <Watchlist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<h2>404 Page Not Found</h2>} />

          </Routes>

        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;