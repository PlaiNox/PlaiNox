import React from 'react'
import '../css/Game.css'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
function Game({game}){

    const {appId, genres, price, headerImage,name} = game
    console.log(headerImage)
    const navigate = useNavigate();

    const goToDetails = () => {
        // Route tabanlı detay sayfasına yönlendiriyoruz
        navigate(`/games/${appId}`);
    }
    return (
        <div className='card'>

            <img className='image' src={headerImage} alt="" />
            <div style={{marginBottom:"30px"}}>
                <p style={{textAlign:'center',height:'30px'}}>{name}</p>
                <h3 style={{textAlign:'center'}}>{price}₺</h3>
            </div>

            <div className='flex-row'>
                <Button sx={{backgroundColor:"black", marginTop: "-50px"}} variant="contained" size="small" onClick={goToDetails}>Detayına git</Button>
            </div>


        </div>
    )
}
export default Game