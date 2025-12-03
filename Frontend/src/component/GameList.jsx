// import React, {useEffect} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import {getAllGame} from "../redux/slices/gameSlice.jsx";
// import Game from "./Game.jsx";
// function GameList(){
//
//     const dispatch = useDispatch();
//     const {games} = useSelector((store) => store.game);
//     console.log(games)
//     useEffect(() => {
//
//         dispatch(getAllGame())
//     }, []);
//     return(
//         <div className='flex-row' style={{flexWrap:'wrap',marginTop:'25px'}}>
//             {
//
//                 games && games.map((game)=>(
//
//                     <Game  key = {game.appId} game = {game}/>
//                 ))
//             }
//         </div>
//     )
// }
// export default GameList


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGame } from "../redux/slices/gameSlice.jsx";
import Game from "./Game.jsx";
import '../css/Game.css'; // CSS dosyasını import etmeyi unutma!

function GameList() {

    const dispatch = useDispatch();
    const { games } = useSelector((store) => store.game);

    useEffect(() => {
        // Eğer oyunlar zaten yüklendiyse tekrar çekme (Opsiyonel optimizasyon)
        if(games.length === 0) {
            dispatch(getAllGame())
        }
    }, [dispatch]); // dispatch bağımlılığını eklemek best practice'dir

    return (
        /* className olarak az önce yazdığımız CSS sınıfını verdik */
        <div className="game-list-wrapper">
            {
                games && games.map((game) => (
                    <Game key={game.appId || game.id} game={game} />
                ))
            }
        </div>
    )
}
export default GameList