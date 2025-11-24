import React from "react";

import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/LoginPage.jsx"
function RouterConfig(){


    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
export default RouterConfig