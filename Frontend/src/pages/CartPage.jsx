import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için
import PageContainer from '../container/PageContainer';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCart, removeFromCart, checkoutCart } from '../redux/slices/cartSlice';
import '../css/CartPage.css'; // CSS dosyasını import etmeyi unutma

function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    const handleRemove = (gameId) => {
        dispatch(removeFromCart(gameId));
    };

    const handleCheckout = () => {
        if (items.length === 0) return;
        dispatch(checkoutCart());
        alert("Satın alma işlemi başarılı!");
    };

    const totalAmount = items.reduce((acc, item) => acc + item.game.price, 0);

    return (
        <PageContainer>
            <div className="cart-page-container">
                <h2 className="cart-title">Sepetim ({items.length})</h2>

                {items.length === 0 ? (
                    <div className="cart-empty">
                        <h3>Sepetiniz şu an boş.</h3>
                        <p>Kütüphanenizi genişletmek için harika oyunlar sizi bekliyor.</p>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate('/')}
                            sx={{ mt: 2, color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                        >
                            Mağazaya Dön
                        </Button>
                    </div>
                ) : (
                    <div className="cart-layout">
                        {/* Ürün Listesi (Sol Taraf) */}
                        <div className="cart-items-list">
                            {items.map((item) => (
                                <div key={item.cart_id} className="cart-item">
                                    <div className="cart-item__info">
                                        <img
                                            src={item.game.headerImage}
                                            alt={item.game.name}
                                            className="cart-item__image"
                                        />
                                        <div>
                                            <h4 className="cart-item__title">{item.game.name}</h4>
                                            <span className="cart-item__publisher">
                                                {item.game.developer || "Yayıncı Bilgisi Yok"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="cart-item__actions">
                                        <span className="cart-item__price">
                                            {item.game.price ? `${item.game.price} ₺` : "Ücretsiz"}
                                        </span>
                                        <IconButton
                                            onClick={() => handleRemove(item.game.appId)}
                                            className="delete-btn"
                                            sx={{ color: '#ef4444' }} // Kırmızı silme butonu
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Özet ve Satın Al Kutusu (Sağ Taraf) */}
                        <div className="cart-summary">
                            <h3>Sipariş Özeti</h3>
                            <div className="cart-summary__row">
                                <span>Ara Toplam:</span>
                                <span>{totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                            </div>
                            <div className="cart-summary__row total">
                                <span>Toplam:</span>
                                <span>{totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                            </div>

                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                size="large"
                                onClick={handleCheckout}
                                className="checkout-btn"
                                sx={{
                                    fontWeight: 'bold',
                                    padding: '12px',
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(45deg, #10b981, #059669)',
                                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                                }}
                            >
                                SATIN AL
                            </Button>

                        </div>
                    </div>
                )}
            </div>
        </PageContainer>
    );
}

export default CartPage;