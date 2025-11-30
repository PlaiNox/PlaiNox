import React, { useEffect, useState, useMemo} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails, clearSelectedGame } from '../redux/slices/gameSlice.jsx';
import { CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import '../css/GameDetail.css';
import {addCart, favoritesAdd, getCurrentUser} from "../redux/slices/userSlice.jsx";


// Fiyat formatlama
const formatPrice = (p) => {
    if (p === null || p === undefined) return "Ücretsiz";
    return `${Number(p).toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
    })}₺`;
};

// Oynama süresi formatlama (şimdilik sade)
const formatPlaytime = (mins) => {
    if (mins == null) return "-";
    return `${mins} dakika`;
};

function GameDetail() {
    const { appId } = useParams();          // URL'den id
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedGame, loading, error } = useSelector((s) => s.game);

    const [isFavorite, setIsFavorite] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false); // MUI popup

    // Sayfa açılınca oyunun detayını çek
    useEffect(() => {
        if (appId) {
            dispatch(getGameDetails(appId));
        }

        // Sayfadan çıkarken seçili oyunu temizle
        return () => {
            dispatch(clearSelectedGame());
        };
    }, [dispatch, appId]);

    // Login kontrolü için basit yardımcı fonksiyon
    const checkLoginOrOpenDialog = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoginDialogOpen(true);
            return false;
        }
        return true;
    };

    // SEPETE EKLE
    const handleAddToCart = () => {
        if (!selectedGame) return;

        // 1) Login değilse dialog aç, işlemi durdur
        if (!checkLoginOrOpenDialog()) return;

        // 2) Backend hangi id'yi istiyorsa ona göre ayarla
        // GameDto'da id varsa onu kullan, yoksa appId'yi sayıya çevir
        const gameId = selectedGame.id ?? Number(appId);

        // 3) Redux thunk çağır
        dispatch(addCart(gameId))
            .unwrap()
            .then(() => {
                alert(`${selectedGame.name} sepete eklendi!`);
            })
            .catch((err) => {
                console.error("Sepete ekleme hatası:", err?.response || err);
                alert("Sepete eklenirken bir hata oluştu.");
            });
    };

    // FAVORİYE EKLE / ÇIKAR
    const handleToggleFavorite = () => {
        if (!selectedGame) return;

        if (!checkLoginOrOpenDialog()) return;

        const gameId = selectedGame.id ?? Number(appId);

        dispatch(favoritesAdd(gameId))
            .unwrap()
            .then(() => {
                setIsFavorite((prev) => !prev);
            })
            .catch((err) => {
                console.error("Favori hatası:", err?.response || err);
                alert("Favorilere eklenirken bir hata oluştu.");
            });
    };

    // Yükleniyor / hata / oyun yok durumları
    if (loading) {
        return (
            <div style={{ padding: 20 }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <div style={{ padding: 20 }}>Hata: {String(error)}</div>;
    }

    if (!selectedGame) {
        return <div style={{ padding: 20 }}>Detay bulunamadı</div>;
    }

    // Seçili oyunun alanlarını al
    const {
        name,
        price,
        aboutGame = "",
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
        website,
    } = selectedGame;

    return (
        <div className="game-detail">
            {/* Üstte Geri ve Site butonları */}
            <div className="game-detail__actions">
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    GERİ
                </Button>
                {website && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => window.open(website, "_blank")}
                    >
                        Resmi Site
                    </Button>
                )}
            </div>

            {/* Üst kısım: kapak + meta bilgiler */}
            <div className="game-detail__header">
                <img className="game-detail__cover" src={headerImage} alt={name} />

                <div className="game-detail__meta">
                    <h1 className="game-detail__title">{name}</h1>
                    <div className="game-detail__price">{formatPrice(price)}</div>

                    {/* Sepete Ekle & Favori Butonları */}
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

                    {/* Geliştirici, yayıncı vs. */}
                    <div className="game-detail__info">
                        <div>
                            <b>Geliştirici:</b> {developer || "-"}
                        </div>
                        <div>
                            <b>Yayıncı(lar):</b>{" "}
                            {publishers.length ? publishers.join(", ") : "-"}
                        </div>
                        <div>
                            <b>Çıkış:</b> {releaseDate || "-"}
                        </div>
                        <div>
                            <b>Tahmini sahipler:</b> {estimatedOwners || "-"}
                        </div>
                        <div>
                            <b>Gerekli yaş:</b> {requiredAge ?? "-"}
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <b>Türler:</b> {genres.length ? genres.join(", ") : "-"}
                        </div>
                    </div>

                    {/* Diller chip'leri */}
                    <div className="game-detail__chips" aria-hidden>
                        {supportedLanguages.map((l) => (
                            <div key={l} className="game-detail__chip">
                                {l}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Alt kısım: açıklama + sağ panel */}
            <div className="game-detail__content">
                <div>
                    <section className="game-detail__description">
                        <h4>Açıklama</h4>
                        <p>{aboutGame}</p>
                    </section>

                    <section
                        className="game-detail__playtime"
                        style={{ marginTop: 18 }}
                    >
                        <h4>Oynama Süreleri</h4>
                        <p>
                            <strong>Son 2 hafta (ortalama):</strong>{" "}
                            {formatPlaytime(averagePlaytimeTwoWeeks)}
                        </p>
                        <p>
                            <strong>Toplam (ortalama):</strong>{" "}
                            {formatPlaytime(averagePlaytimeForever)}
                        </p>
                    </section>
                </div>

                <aside className="game-detail__aside">
                    <h4>Ek Bilgiler</h4>
                    <p>
                        <b>Etiketler / Kategoriler:</b> {"-"}
                    </p>
                    <div style={{ marginTop: 10 }}>
                        <h4>Ekran Görüntüleri</h4>
                        <div className="game-detail__screenshots">
                            {/* İleride selectedGame.screenshots varsa burada map'lersin */}
                        </div>
                    </div>
                </aside>
            </div>

            {/* LOGIN DİALOGU */}
            <Dialog
                open={loginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
            >
                <DialogTitle>Giriş Yapmalısın</DialogTitle>
                <DialogContent>
                    Sepete eklemek veya favorilere eklemek için hesabınla giriş yapman
                    gerekiyor.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLoginDialogOpen(false)}>Vazgeç</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setLoginDialogOpen(false);
                            navigate("/login");
                        }}
                    >
                        Giriş Yap
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GameDetail;
