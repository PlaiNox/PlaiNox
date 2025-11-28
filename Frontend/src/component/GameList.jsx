import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllGame} from "../redux/slices/gameSlice.jsx";
import Game from "./Game.jsx";
function GameList(){

    const dispatch = useDispatch();
    const {games} = useSelector((store) => store.game);
    console.log(games)
    useEffect(() => {

        dispatch(getAllGame())
    }, []);
    return(
        <div className='flex-row' style={{flexWrap:'wrap',marginTop:'25px'}}>
            {

                games && games.map((game)=>(

                    <Game  key = {game.appId} game = {game}/>
                ))
            }
        </div>
    )
}
export default GameList