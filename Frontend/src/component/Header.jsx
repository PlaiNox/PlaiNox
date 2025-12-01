import React, {useState} from 'react'
import '../css/Header.css'
import { FaShoppingBasket } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'; 
import { setSearchQuery } from '../redux/slices/gameSlice';
import logo from '../image/steam-seeklogo.png';
import { FaBook } from "react-icons/fa";

function Header(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[theme, setTheme] = useState(false);

    const changeTheme = () => {
        const root = document.getElementById("root");
        const body = document.body;
        if(theme){
            root.style.backgroundColor="black";
            root.style.color = "#fff";
            body.style.backgroundColor = "black";
            body.style.color = "#fff";
        } else {
            root.style.backgroundColor = "#fff";
            root.style.color= "black";
            body.style.backgroundColor = "#fff";
            body.style.color = "black";
        }
        setTheme(!theme);
    }

    const handleProfileClick = () => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        }else{
            navigate("/profile");
        }
    }

    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value));
    }

    return(
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            {/* Logo Alanı */}
            <div className='flex-row' onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
                {/* SRC kısmını güncelledik */}
                <img className="logo" src={logo} alt="logo" />
                <p className="logo-text">PLAINOX</p>
            </div>

            {/* İkonlar Alanı */}
            <div className='flex-row'>
                <input className='search-input' type='text' placeholder='Bir şeyler ara' onChange={handleSearch}/>
                <div>
                    {theme ? <FaMoon className='icon' onClick={changeTheme}/>  : <CiLight className='icon' onClick={changeTheme}/> }
                    
                    <FaShoppingBasket className='icon' onClick={() => navigate("/cart")} title="Sepetim"/>
                    
                    <FaHeart className='icon' onClick={() => navigate("/favorites")} title="Favorilerim"/>

                    <FaBook className='icon' onClick={() => navigate("/library")} title="Kütüphanem" />

                    <FaUser className='icon' onClick={handleProfileClick} style={{cursor: 'pointer'}} title="Profil" />
                </div>
            </div>
        </div>
    )
}

export default Header