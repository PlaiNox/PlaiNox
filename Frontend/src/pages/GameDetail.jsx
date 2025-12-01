import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails, clearSelectedGame } from '../redux/slices/gameSlice.jsx';
import { addToFavorites, getFavorites } from '../redux/slices/favoriteSlice.jsx';
import { addToCart } from '../redux/slices/cartSlice.jsx';
import { CircularProgress, Button } from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import '../css/GameDetail.css';

const formatPrice = (p) => p ? `${Number(p).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}₺` : 'Ücretsiz';

function GameDetail() {
  const { appId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { selectedGame, loading, error } = useSelector(s => s.game);
  const { favorites } = useSelector(s => s.favorite);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (appId) {
        dispatch(getGameDetails(appId));
        dispatch(getFavorites()); 
    }
    return () => dispatch(clearSelectedGame());
  }, [dispatch, appId]);

  useEffect(() => {
      if (selectedGame && favorites.length > 0) {
          const exists = favorites.some(fav => fav.gameDto.appId === selectedGame.appId);
          setIsFavorite(exists);
      }
  }, [favorites, selectedGame]);

  const handleAddToCart = () => {
      if(selectedGame) dispatch(addToCart(selectedGame.appId));
  };

  const handleToggleFavorite = () => {
      if(selectedGame) {
          setIsFavorite(!isFavorite); 
          dispatch(addToFavorites(selectedGame.appId));
      }
  };

  if (loading) return <div style={{ padding: 20 }}><CircularProgress /></div>;
  if (error) return <div style={{ padding: 20 }}>Hata: {String(error)}</div>;
  if (!selectedGame) return <div style={{ padding: 20 }}>Detay bulunamadı</div>;

  const { name, price, headerImage, aboutGame, developer, publishers, genres, estimatedOwners, releaseDate, supportedLanguages, website } = selectedGame;

  return (
    <div className="game-detail">
      <div className="game-detail__actions">
        <Button variant="outlined" onClick={() => navigate(-1)}>GERİ</Button>
        {website && <Button variant="contained" onClick={() => window.open(website, '_blank')}>Resmi Site</Button>}
      </div>

      <div className="game-detail__header">
        <img className="game-detail__cover" src={headerImage} alt={name} />
        <div className="game-detail__meta">
          <h1 className="game-detail__title">{name}</h1>
          <div className="game-detail__price">{formatPrice(price)}</div>

          <div className="game-detail__buttons">
            <Button variant="contained" color="success" startIcon={<ShoppingCart />} onClick={handleAddToCart} className="game-detail__cart-btn">
              Sepete Ekle
            </Button>
            <Button variant="outlined" color="error" onClick={handleToggleFavorite} className="game-detail__favorite-btn">
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </Button>
          </div>

          <div className="game-detail__info">
            <div><b>Geliştirici:</b> {developer}</div>
            <div><b>Yayıncı:</b> {publishers?.join(', ')}</div>
            <div><b>Çıkış:</b> {releaseDate}</div>
            <div><b>Türler:</b> {genres?.join(', ')}</div>
          </div>
        </div>
      </div>
      
      <div className="game-detail__content">
          <section className="game-detail__description">
            <h4>Açıklama</h4>
            <p>{aboutGame}</p>
          </section>
      </div>
    </div>
  );
}

export default GameDetail;