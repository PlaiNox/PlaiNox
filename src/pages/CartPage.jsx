import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../container/PageContainer';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// Yeni yazdığımız fonksiyonları çağırıyoruz
import { getCart, removeFromCart, checkoutCart } from '../redux/slices/cartSlice';

function CartPage() {
    const dispatch = useDispatch();
    // Sepet verisini Redux'tan çekiyoruz
    const { items } = useSelector(state => state.cart);

    useEffect(() => {
        // Sayfa açılınca güncel sepeti getir
        dispatch(getCart());
    }, [dispatch]);

    // Silme işlemi
    const handleRemove = (gameId) => {
        dispatch(removeFromCart(gameId));
    };

    // SATIN ALMA İŞLEMİ
    const handleCheckout = () => {
        // Sepet boşsa işlem yapma
        if (items.length === 0) return;

        // Redux action'ını çalıştır
        dispatch(checkoutCart());
    };

    // Toplam tutarı hesapla
    const totalAmount = items.reduce((acc, item) => acc + item.game.price, 0);

    return (
        <PageContainer>
            <h2 style={{ marginTop: '30px', marginBottom: '20px' }}>Sepetim ({items.length})</h2>

            {items.length === 0 ? (
                <div style={{textAlign:'center', padding:'50px', color:'#777'}}>
                    <h3>Sepetiniz boş</h3>
                    <p>Hadi gidip biraz oyun ekleyelim!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                    {/* Ürün Listesi */}
                    <div style={{ flex: 3, minWidth: '300px' }}>
                        {items.map((item) => (
                            <div key={item.cart_id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: '#fff',
                                padding: '15px',
                                marginBottom: '15px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <img
                                        src={item.game.headerImage}
                                        alt={item.game.name}
                                        style={{ width: '100px', borderRadius: '4px' }}
                                    />
                                    <div>
                                        <h4 style={{ margin: 0 }}>{item.game.name}</h4>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ fontWeight: 'bold' }}>{item.game.price} ₺</span>
                                    <IconButton color="error" onClick={() => handleRemove(item.game.appId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Özet ve Satın Al Kutusu */}
                    <div style={{ flex: 1, background: '#f5f5f5', padding: '20px', borderRadius: '10px', minWidth: '250px' }}>
                        <h3>Özet</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                            <span>Toplam:</span>
                            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                {totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                            </span>
                        </div>

                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            size="large"
                            onClick={handleCheckout} // Butonu bağladık
                        >
                            Satın Al
                        </Button>
                    </div>
                </div>
            )}
        </PageContainer>
    );
}

export default CartPage;