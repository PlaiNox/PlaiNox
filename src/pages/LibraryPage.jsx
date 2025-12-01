import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLibrary } from '../redux/slices/librarySlice';
import PageContainer from '../container/PageContainer';
import Game from '../component/Game';
import GamePlay from "../component/GamePlay.jsx"; // Oyun kartını burada da kullanalım

function LibraryPage() {
    const dispatch = useDispatch();
    const { games, loading } = useSelector(state => state.library);

    useEffect(() => {
        dispatch(getLibrary());
    }, [dispatch]);

    return (
        <PageContainer>
            <h2 style={{ marginTop: '30px', marginBottom: '20px' }}>Kütüphanem</h2>

            {loading ? <p>Yükleniyor...</p> : (
                games.length === 0 ? (
                    <p>Kütüphanenizde henüz oyun yok.</p>
                ) : (
                    <div className='flex-row' style={{flexWrap:'wrap', gap:'15px'}}>
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