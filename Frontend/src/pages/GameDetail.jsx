import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails, clearSelectedGame } from '../redux/slices/gameSlice.jsx';
import { CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { addCart, favoritesAdd } from "../redux/slices/userSlice.jsx";
import '../css/GameDetail.css'; // Aşağıdaki CSS dosyasını oluşturmayı unutmayın!

const formatPrice = (p) => {
    if (p === null || p === undefined) return "Ücretsiz";
    return `${Number(p).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}₺`;
};

const formatPlaytime = (mins) => {
    if (mins == null) return "-";
    return `${mins} dakika`;
};

function GameDetail() {
    const { appId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedGame, loading, error } = useSelector((s) => s.game);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    useEffect(() => {
        if (appId) dispatch(getGameDetails(appId));
        return () => { dispatch(clearSelectedGame()); };
    }, [dispatch, appId]);

    const checkLoginOrOpenDialog = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoginDialogOpen(true);
            return false;
        }
        return true;
    };

    const handleAddToCart = () => {
        if (!selectedGame || !checkLoginOrOpenDialog()) return;
        const gameId = selectedGame.id ?? Number(appId);

        dispatch(addCart(gameId))
            .unwrap()
            .then(() => alert(`${selectedGame.name} sepete eklendi!`))
            .catch((err) => {
                console.error(err);
                alert("Hata oluştu.");
            });
    };

    const handleToggleFavorite = () => {
        if (!selectedGame || !checkLoginOrOpenDialog()) return;
        const gameId = selectedGame.id ?? Number(appId);

        dispatch(favoritesAdd(gameId))
            .unwrap()
            .then(() => setIsFavorite((prev) => !prev))
            .catch((err) => {
                console.error(err);
                alert("Hata oluştu.");
            });
    };

    if (loading) return <div className="game-loading"><CircularProgress color="inherit" /></div>;
    if (error) return <div className="game-error">Hata: {String(error)}</div>;
    if (!selectedGame) return <div className="game-error">Detay bulunamadı</div>;

    const {
        name, price, aboutGame = "", supportedLanguages = [], headerImage,
        averagePlaytimeTwoWeeks, averagePlaytimeForever, developer,
        publishers = [], genres = [], estimatedOwners, requiredAge, releaseDate, website,
    } = selectedGame;

    return (
        <div className="game-detail-container">
            <div className="game-detail">
                <div className="game-detail__actions">
                    <Button variant="outlined" sx={{color: 'white', borderColor: 'rgba(255,255,255,0.3)'}} onClick={() => navigate(-1)}>
                        GERİ
                    </Button>
                    {website && (
                        <Button variant="contained" color="primary" onClick={() => window.open(website, "_blank")}>
                            Resmi Site
                        </Button>
                    )}
                </div>

                <div className="game-detail__header">
                    <img className="game-detail__cover" src={headerImage} alt={name} />

                    <div className="game-detail__meta">
                        <h1 className="game-detail__title">{name}</h1>
                        <div className="game-detail__price">{formatPrice(price)}</div>

                        <div className="game-detail__buttons">
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<ShoppingCart />}
                                onClick={handleAddToCart}
                                className="game-detail__cart-btn"
                            >
                                Sepete Ekle
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleToggleFavorite}
                                className="game-detail__favorite-btn"
                            >
                                {isFavorite ? <Favorite /> : <FavoriteBorder />}
                            </Button>
                        </div>

                        <div className="game-detail__info">
                            <div><b>Geliştirici:</b> {developer || "-"}</div>
                            <div><b>Yayıncı:</b> {publishers.length ? publishers.join(", ") : "-"}</div>
                            <div><b>Çıkış Tarihi:</b> {releaseDate || "-"}</div>
                        </div>

                        <div className="game-detail__chips">
                            {supportedLanguages.slice(0, 5).map((l) => (
                                <div key={l} className="game-detail__chip">{l}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="game-detail__content">
                    <div className="game-detail__main">
                        <section className="game-detail__description">
                            <h4>Oyun Hakkında</h4>
                            <p dangerouslySetInnerHTML={{ __html: aboutGame }} />
                        </section>
                    </div>

                    <aside className="game-detail__aside">
                        <h4>İstatistikler</h4>
                        <div className="stat-row">
                            <span>Son 2 Hafta:</span>
                            <strong>{formatPlaytime(averagePlaytimeTwoWeeks)}</strong>
                        </div>
                        <div className="stat-row">
                            <span>Toplam Süre:</span>
                            <strong>{formatPlaytime(averagePlaytimeForever)}</strong>
                        </div>
                        <div className="stat-row" style={{marginTop: 10}}>
                            <span>Yaş Sınırı:</span>
                            <strong>{requiredAge ? `+${requiredAge}` : "Genel"}</strong>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <strong>Türler:</strong>
                            <div className="game-detail__chips" style={{marginTop: 5}}>
                                {genres.map(g => <span key={g} className="game-detail__chip small">{g}</span>)}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} PaperProps={{ style: { backgroundColor: '#1e293b', color: 'white' } }}>
                <DialogTitle>Giriş Yapmalısın</DialogTitle>
                <DialogContent>
                    <p style={{color: '#ccc'}}>Bu işlemi gerçekleştirmek için giriş yapmanız gerekiyor.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLoginDialogOpen(false)} sx={{color: '#94a3b8'}}>Vazgeç</Button>
                    <Button variant="contained" onClick={() => { setLoginDialogOpen(false); navigate("/login"); }}>
                        Giriş Yap
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GameDetail;
