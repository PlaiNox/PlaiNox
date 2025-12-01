import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageContainer from '../container/PageContainer';
import Game from '../component/Game';

function FavoritesPage() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            axios.get("http://localhost:8080/users/favorite/list", { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setItems(res.data));
        }
    }, []);
    return (
        <PageContainer>
            <h2>Favorilerim</h2>
            <div style={{display:'flex', flexWrap:'wrap'}}>{items.map(item => <Game key={item.id} game={item.gameDto} />)}</div>
        </PageContainer>
    )
}
export default FavoritesPage;