import React from 'react'
import '../css/Game.css'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function GamePlay({ game }) {

    const { appId, genres, price, headerImage, name, website } = game;
    console.log(headerImage);
    const navigate = useNavigate();

    const handlePlayClick = () => {
        // Eğer backend'den website geldiyse yeni sekmede aç
        if (website) {
            window.open(website, "_blank");
            return;
        }

        // Website yoksa yedek olarak detay sayfasına yönlendir
        navigate(`/games/${appId}`);
    };

    return (
        <div className='card'>

            <img className='image' src={headerImage} alt="" />
            <div>
                <p style={{ textAlign: 'center', height: '30px' }}>{name}</p>
            </div>

            <div className='flex-row' style={{marginTop:"35px"}}>
                <Button
                    sx={{ backgroundColor: "black" , marginTop:"-60px"}}
                    variant="contained"
                    size="small"
                    onClick={handlePlayClick}
                >
                    Oyunu oyna
                </Button>
            </div>

        </div>
    )
}

export default GamePlay