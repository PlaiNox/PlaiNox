import React from "react";

import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import GameDetail from  "../pages/GameDetail.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import VerifyPage from "../pages/VerifyPage.jsx";
import CartPage from "../pages/CartPage.jsx";
import FavoritesPage from "../pages/FavoritesPage.jsx";
import LibraryPage from "../pages/LibraryPage.jsx";

function RouterConfig(){


    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/games/:appId" element={<GameDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/library" element={<LibraryPage />} />

        </Routes>
    )
}
export default RouterConfig