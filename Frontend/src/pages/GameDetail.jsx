import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails, clearSelectedGame } from '../redux/slices/gameSlice.jsx';
import { CircularProgress, Button } from '@mui/material';
import '../css/GameDetail.css';

const formatPrice = (p) => {
  if (p === null || p === undefined) return 'Ücretsiz';
  return `${Number(p).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}₺`;
};
const formatPlaytime = (mins) => {
  return `${mins} saat`;
};

function GameDetail() {
  const { appId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedGame, loading, error } = useSelector(s => s.game);

  useEffect(() => {
    if (appId) dispatch(getGameDetails(appId));
    return () => dispatch(clearSelectedGame());
  }, [dispatch, appId]);

  if (loading) return <div style={{ padding: 20 }}><CircularProgress /></div>;
  if (error) return <div style={{ padding: 20 }}>Hata: {String(error)}</div>;
  if (!selectedGame) return <div style={{ padding: 20 }}>Detay bulunamadı</div>;

  const {
    name,
    price,
    aboutGame = '',
    supportedLanguages = [],
    headerImage,
    averagePlaytimeTwoWeeks,
    averagePlaytimeForever,
    developer,
    publishers = [],
    genres = [],
    estimatedOwners,
    requiredAge,
    releaseDate,
    website
  } = selectedGame;

  return (
    <div className="game-detail">
      <div className="game-detail__actions">
        <Button variant="outlined" onClick={() => navigate(-1)}>GERI</Button>
        {website && <Button variant="contained" color="primary" onClick={() => window.open(website, '_blank')}>Resmi Site</Button>}
      </div>

      <div className="game-detail__header">
        <img className="game-detail__cover" src={headerImage} alt={name} />
        <div className="game-detail__meta">
          <h1 className="game-detail__title">{name}</h1>
          <div className="game-detail__price">{formatPrice(price)}</div>

          <div className="game-detail__info">
            <div><b>Geliştirici:</b> {developer || '-'}</div>
            <div><b>Yayıncı(lar):</b> {publishers.length ? publishers.join(', ') : '-'}</div>
            <div><b>Çıkış:</b> {releaseDate || '-'}</div>
            <div><b>Tahmini sahipler:</b> {estimatedOwners || '-'}</div>
            <div><b>Gerekli yaş:</b> {requiredAge ?? '-'}</div>
            <div style={{ marginTop: 8 }}><b>Türler:</b> {genres.length ? genres.join(', ') : '-'}</div>
          </div>

          <div className="game-detail__chips" aria-hidden>
            {supportedLanguages.map(l => (
              <div key={l} className="game-detail__chip">{l}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="game-detail__content">
        <div>
          <section className="game-detail__description">
            <h4>Açıklama</h4>
            <p>{aboutGame}</p>
          </section>

          <section className="game-detail__playtime" style={{ marginTop: 18 }}>
            <h4>Oynama Süreleri</h4>
            <p><strong>Son 2 hafta (ortalama):</strong> {formatPlaytime(averagePlaytimeTwoWeeks)}</p>
            <p><strong>Toplam (ortalama):</strong> {formatPlaytime(averagePlaytimeForever)}</p>
          </section>
        </div>

        <aside className="game-detail__aside">
          <h4>Ek Bilgiler</h4>
          <p><b>Etiketler / Kategoriler:</b> { /* categories olabilir */ '-'}</p>
          <div style={{ marginTop: 10 }}>
            <h4>Ekran Görüntüleri</h4>
            <div className="game-detail__screenshots">
              {/* Eğer selectedGame.screenshots varsa map ile göster */}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default GameDetail;