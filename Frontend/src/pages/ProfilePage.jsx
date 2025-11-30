import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../container/PageContainer'
import '../css/ProfilePage.css' // <--- CSS DOSYASINI BURAYA ÇAĞIRDIK

function ProfilePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        axios.get("http://localhost:8080/users/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            if (error.response?.status === 401) {
                 localStorage.removeItem("token");
                 navigate("/login");
            }
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
        // Backendde bir logout kodu yazıp eklememiz lazım buraya.
    }

    if (!user) return <div className="profile-container"><h3>Yükleniyor...</h3></div>;

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
    )
}

export default ProfilePage