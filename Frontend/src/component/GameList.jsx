import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllGame} from "../redux/slices/gameSlice.jsx";
import Game from "./Game.jsx";

function GameList(){

    const dispatch = useDispatch();
    // Hem oyunları hem de arama kelimesini çekiyoruz
    const { games, searchQuery } = useSelector((store) => store.game);

    useEffect(() => {
        dispatch(getAllGame())
    }, []);

    
    const filteredGames = games.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return(
        <div className='flex-row' style={{flexWrap:'wrap', marginTop:'25px'}}>
            {
                filteredGames && filteredGames.map((game)=>(
                    <Game key={game.appId} game={game}/>
                ))
            }
            {filteredGames.length === 0 && <p style={{width:'100%', textAlign:'center'}}>Aradığınız oyun bulunamadı.</p>}
        </div>
    )
}
export default GameList