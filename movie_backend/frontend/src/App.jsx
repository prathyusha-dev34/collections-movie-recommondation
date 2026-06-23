import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {/* Navbar show only when logged in */}
      {token && <Navbar />}

      <div style={{ display: "flex" }}>
        {/* Sidebar only after login */}
        {token && <Sidebar />}

        <div style={{ flex: 1 }}>
          <Routes>

            {/* Default Route */}
            <Route
              path="/"
              element={
                token ? <Navigate to="/home" /> : <Navigate to="/login" />
              }
            />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Home */}
            <Route path="/home" element={<Home />} />

            {/* Movies */}
            <Route path="/movies" element={<Movies />} />

            {/* ⭐ Collections (IMPORTANT) */}
            <Route path="/collections" element={<CollectionsPage />} />

            {/* Favorites */}
            <Route path="/favorites" element={<Favorites />} />

            {/* Watchlist */}
            <Route path="/watchlist" element={<Watchlist />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Catch all */}
            <Route path="*" element={<h2>404 Page Not Found</h2>} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;