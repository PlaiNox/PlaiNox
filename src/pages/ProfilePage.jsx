import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PageContainer from "../container/PageContainer";
import "../css/ProfilePage.css";

import { getCurrentUser } from "../redux/slices/userSlice.jsx";

function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // userSlice içindeki user state’i
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        // 1) Token yoksa direkt login sayfasına gönder
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // 2) Token varsa backend'den /users/me isteğini at
        dispatch(getCurrentUser())
            .unwrap()
            .catch((err) => {
                // Eğer 401 dönerse token geçersiz demektir → çıkış yap
                if (err?.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    console.error("Kullanıcı bilgisi alınırken hata:", err);
                }
            });
    }, [dispatch, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        // İstersen ileride backend'e /logout isteği de ekleyebilirsin
    };

    if (!user || !user.username) {
        return (
            <PageContainer>
                <div className="profile-container">
                    <h3>Yükleniyor...</h3>
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <div className="profile-container">
                <div className="profile-card">
                    {/* Profil Resmi */}
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="Profile"
                        className="profile-avatar"
                    />

                    <h2 className="profile-title">Hoş Geldiniz</h2>
                    <p className="profile-subtitle">Hesap detaylarınız aşağıdadır</p>

                    {/* Bilgilerin Olduğu Kutu */}
                    <div className="profile-info-box">
                        <div className="info-row">
                            <span className="info-label">Kullanıcı Adı:</span>
                            <span className="info-value">{user.username}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{user.email}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Kullanıcı ID:</span>
                            <span className="info-value">#{user.id}</span>
                        </div>
                    </div>

                    <button className="logout-btn" onClick={handleLogout}>
                        Güvenli Çıkış
                    </button>
                </div>
            </div>
        </PageContainer>
    );
}

export default ProfilePage;
