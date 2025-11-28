import React from "react";

import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/LoginPage.jsx";
import GameDetail from  "../pages/GameDetail.jsx";
function RouterConfig(){


    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/games/:appId" element={<GameDetail />} />
        </Routes>
    )
}
export default RouterConfig