// import React, {useState} from 'react'
// import '../css/Header.css'
// import { FaShoppingBasket } from "react-icons/fa";
// import { CiLight } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
// import { FaMoon } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux';
// import {getAllGame, getFavoritesGame, getOrderedGame, setSearchQuery} from '../redux/slices/gameSlice';
// import logo from '../image/steam-seeklogo.png';
// import { FaBook } from "react-icons/fa";
//
// function Header(){
//
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const[theme, setTheme] = useState(false);
//
//     // const changeTheme = () => {
//     //     const root = document.getElementById("root");
//     //     const body = document.body;
//     //     if(theme){
//     //         root.style.backgroundColor="black";
//     //         root.style.color = "#fff";
//     //         body.style.backgroundColor = "black";
//     //         body.style.color = "#fff";
//     //     } else {
//     //         root.style.backgroundColor = "#fff";
//     //         root.style.color= "black";
//     //         body.style.backgroundColor = "#fff";
//     //         body.style.color = "black";
//     //     }
//     //     setTheme(!theme);
//     // }
//     const changeTheme = () => {
//         const body = document.body;
//
//         if (theme) {
//             body.classList.add("dark-theme");
//             body.classList.remove("light-theme");
//         } else {
//             body.classList.add("light-theme");
//             body.classList.remove("dark-theme");
//         }
//         setTheme(!theme);
//     };
//
//     // logoya basınca tüm oyunları getir.
//     const handleLogoClick = () => {
//         dispatch(getAllGame());
//         navigate("/");
//     }
//
//     // en çok sipariş edileneleri getir
//     const handleShowOrdered = () =>{
//         dispatch(getOrderedGame());
//         navigate("/");
//     }
//
//     //en popüler oyunları getir
//     const handleShowFavorites = () => {
//         dispatch(getFavoritesGame());
//         navigate("/");
//     }
//
//     const handleProfileClick = () => {
//         const token = localStorage.getItem("token");
//         if(!token){
//             navigate("/login");
//         }else{
//             navigate("/profile");
//         }
//     }
//
//     const handleSearch = (e) => {
//         dispatch(setSearchQuery(e.target.value));
//     }
//
//     return(
//         <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
//             {/* Logo Alanı */}
//             <div className='flex-row' onClick={handleLogoClick} style={{cursor: 'pointer'}}>
//                 <img className="logo" src="./src/image/steam-seeklogo.png" alt="logo" />
//                 <p className="logo-text">PLAINOX</p>
//             </div>
//             <div className='nav-links'>
//                 <button className='nav-btn' onClick={handleShowOrdered}>En Çok Satanlar</button>
//                 <button className='nav-btn' onClick={handleShowFavorites}>En Popüler</button>
//             </div>
//
//             {/* İkonlar Alanı */}
//             <div className='flex-row'>
//                 <input className='search-input' type='text' placeholder='Bir şeyler ara' onChange={handleSearch}/>
//                 <div>
//                     {theme ? <FaMoon className='icon' onClick={changeTheme}/>  : <CiLight className='icon' onClick={changeTheme}/> }
//
//                     <FaShoppingBasket className='icon' onClick={() => navigate("/cart")} title="Sepetim"/>
//
//                     <FaHeart className='icon' onClick={() => navigate("/favorites")} title="Favorilerim"/>
//
//                     <FaBook className='icon' onClick={() => navigate("/library")} title="Kütüphanem" />
//
//                     <FaUser className='icon' onClick={handleProfileClick} style={{cursor: 'pointer'}} title="Profil" />
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Header




import React, { useState } from 'react';
import '../css/Header.css';
import { FaShoppingBasket, FaHeart, FaMoon, FaUser, FaBook } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllGame, getFavoritesGame, getOrderedGame, setSearchQuery } from '../redux/slices/gameSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [theme, setTheme] = useState(false);

    const changeTheme = () => {
        const body = document.body;
        if (theme) {
            body.classList.add("dark-theme");
            body.classList.remove("light-theme");
        } else {
            body.classList.add("light-theme");
            body.classList.remove("dark-theme");
        }
        setTheme(!theme);
    };

    const handleLogoClick = () => {
        dispatch(getAllGame());
        navigate("/");
    };

    const handleShowOrdered = () => {
        dispatch(getOrderedGame());
        navigate("/");
    };

    const handleShowFavorites = () => {
        dispatch(getFavoritesGame());
        navigate("/");
    };

    const handleProfileClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            navigate("/profile");
        }
    };

    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <header className="header-container">
            {/* 1. Sol Taraf: Logo */}
            <div className='header-left' onClick={handleLogoClick}>
                <h1 className="logo-text">PLAINOX</h1>
            </div>

            {/* 2. Orta Taraf: Linkler */}
            <nav className='header-center nav-links'>
                <button className='nav-btn' onClick={handleShowOrdered}>En Çok Satanlar</button>
                <button className='nav-btn' onClick={handleShowFavorites}>En Popüler</button>
            </nav>

            {/* 3. Sağ Taraf: Arama ve İkonlar */}
            <div className='header-right'>
                <input
                    className='search-input'
                    type='text'
                    placeholder='Bir şeyler ara...'
                    onChange={handleSearch}
                />

                <div className="icon-group">
                    <FaShoppingBasket className='icon' onClick={() => navigate("/cart")} title="Sepetim" />
                    <FaHeart className='icon' onClick={() => navigate("/favorites")} title="Favorilerim" />
                    <FaBook className='icon' onClick={() => navigate("/library")} title="Kütüphanem" />
                    <FaUser className='icon' onClick={handleProfileClick} title="Profil" />
                </div>
            </div>
        </header>
    );
}

export default Header;