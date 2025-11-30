import React, {useState} from 'react'
import '../css/Header.css'
import { FaShoppingBasket } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


function Header(){

    const navigate = useNavigate();


    const[theme, setTheme] = useState(false);
    const changeTheme = () => {

        const root = document.getElementById("root");

        const body = document.body;
        if(theme){
            root.style.backgroundColor="black";
            root.style.color = "#fff";
            body.style.backgroundColor = "black";
            body.style.color = "#fff";
        }
        else{
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
            // Eğer giriş yapılmamaışsa login sayfasına git.
            navigate("/login");
        }else{
            console.log("Kullanıcı giriş yapmış");
            navigate("/profile");
            }
    }


    return(
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <div className='flex-row' onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
                <img className="logo" src="./src/image/steam-seeklogo.png" alt="logo" />
                <p className="logo-text">PLAINOX</p>
            </div>
            <div className='flex-row'>
                <input className='search-input' type='text' placeholder='Bir şeyler ara'/>
                <div>

                    {theme ? <FaMoon className='icon' onClick={changeTheme}/>  : <CiLight className='icon' onClick={changeTheme}/> }

                    <FaShoppingBasket className='icon'/>
                    {/*<FaRegHeart className='icon' />*/}

                    <FaHeart className='icon' />

                    <FaUser className='icon' onClick={handleProfileClick} style={{cursor: 'pointer'}} title="Giriş Yap / Profil" />


                </div>
            </div>
        </div>
    )

}

export default Header