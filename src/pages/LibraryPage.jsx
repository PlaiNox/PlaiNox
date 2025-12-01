// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getLibrary } from '../redux/slices/librarySlice';
// import PageContainer from '../container/PageContainer';
// import Game from '../component/Game';
// import GamePlay from "../component/GamePlay.jsx"; // Oyun kartını burada da kullanalım
//
// function LibraryPage() {
//     const dispatch = useDispatch();
//     const { games, loading } = useSelector(state => state.library);
//
//     useEffect(() => {
//         dispatch(getLibrary());
//     }, [dispatch]);
//
//     return (
//         <PageContainer>
//             <h2 style={{ marginTop: '30px', marginBottom: '20px' }}>Kütüphanem</h2>
//
//             {loading ? <p>Yükleniyor...</p> : (
//                 games.length === 0 ? (
//                     <p>Kütüphanenizde henüz oyun yok.</p>
//                 ) : (
//                     <div className='flex-row' style={{flexWrap:'wrap', gap:'15px'}}>
//                         {games.map((game) => (
//                             <GamePlay key={game.appId} game={game} />
//                         ))}
//                     </div>
//                 )
//             )}
//         </PageContainer>
//     );
// }
//
// export default LibraryPage;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLibrary } from '../redux/slices/librarySlice';
import PageContainer from '../container/PageContainer';
import GamePlay from "../component/GamePlay.jsx";
import '../css/Game.css'; // 1. CSS dosyasını import ettik

function LibraryPage() {
    const dispatch = useDispatch();
    const { games, loading } = useSelector(state => state.library);

    useEffect(() => {
        dispatch(getLibrary());
    }, [dispatch]);

    return (
        <PageContainer>
            {/* Başlığı ortaladık ki diğer sayfalarla uyumlu olsun */}
            <h2 style={{ marginTop: '30px', marginBottom: '10px',marginLeft:'20px', color: '#fff' }}>Kütüphanem</h2>

            {loading ? <p style={{textAlign:'center'}}>Yükleniyor...</p> : (
                games.length === 0 ? (
                    <p style={{textAlign:'center'}}>Kütüphanenizde henüz oyun yok.</p>
                ) : (
                    /* 2. Inline style'ı sildik, ortak sınıfı kullandık */
                    <div className="game-list-wrapper">
                        {games.map((game) => (
                            <GamePlay key={game.appId} game={game} />
                        ))}
                    </div>
                )
            )}
        </PageContainer>
    );
}

export default LibraryPage;