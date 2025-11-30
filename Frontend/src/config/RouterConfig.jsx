import React from "react";

import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import GameDetail from  "../pages/GameDetail.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

function RouterConfig(){


    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/games/:appId" element={<GameDetail />} />
            <Route path="/profile" element={<ProfilePage />} />


        </Routes>
    )
}
export default RouterConfig