import React from 'react'
import '../css/Game.css'
import {Button} from "@mui/material";
function Game({game}){

    const {appId, genres, price, headerImage,name} = game
    console.log(headerImage)
    return (
        <div className='card'>

            <img className='image' src={headerImage} alt="" />
            <div>
                <p style={{textAlign:'center',height:'30px'}}>{name}</p>
                <h3 style={{textAlign:'center'}}>{price}₺</h3>
            </div>

            <div className='flex-row'>
                <Button sx={{backgroundColor:"black"}} variant="contained" size="small">Detayına git</Button>
            </div>


        </div>
    )
}
export default Game