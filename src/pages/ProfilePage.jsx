// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
//
// import PageContainer from "../container/PageContainer";
// import "../css/ProfilePage.css";
//
// import { getCurrentUser } from "../redux/slices/userSlice.jsx";
//
// function ProfilePage() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//
//     // userSlice içindeki user state’i
//     const user = useSelector((state) => state.user.user);
//
//     useEffect(() => {
//         // 1) Token yoksa direkt login sayfasına gönder
//         const token = localStorage.getItem("token");
//         if (!token) {
//             navigate("/login");
//             return;
//         }
//
//         // 2) Token varsa backend'den /users/me isteğini at
//         dispatch(getCurrentUser())
//             .unwrap()
//             .catch((err) => {
//                 // Eğer 401 dönerse token geçersiz demektir → çıkış yap
//                 if (err?.response?.status === 401) {
//                     localStorage.removeItem("token");
//                     navigate("/login");
//                 } else {
//                     console.error("Kullanıcı bilgisi alınırken hata:", err);
//                 }
//             });
//     }, [dispatch, navigate]);
//
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//         // İstersen ileride backend'e /logout isteği de ekleyebilirsin
//     };
//
//     if (!user || !user.username) {
//         return (
//             <PageContainer>
//                 <div className="profile-container">
//                     <h3>Yükleniyor...</h3>
//                 </div>
//             </PageContainer>
//         );
//     }
//
//     return (
//         <PageContainer>
//             <div className="profile-container">
//                 <div className="profile-card">
//                     {/* Profil Resmi */}
//                     <img
//                         src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//                         alt="Profile"
//                         className="profile-avatar"
//                     />
//
//                     <h2 className="profile-title">Hoş Geldiniz</h2>
//                     <p className="profile-subtitle">Hesap detaylarınız aşağıdadır</p>
//
//                     {/* Bilgilerin Olduğu Kutu */}
//                     <div className="profile-info-box">
//                         <div className="info-row">
//                             <span className="info-label">Kullanıcı Adı:</span>
//                             <span className="info-value">{user.username}</span>
//                         </div>
//
//                         <div className="info-row">
//                             <span className="info-label">Email:</span>
//                             <span className="info-value">{user.email}</span>
//                         </div>
//
//                         <div className="info-row">
//                             <span className="info-label">Kullanıcı ID:</span>
//                             <span className="info-value">#{user.id}</span>
//                         </div>
//                     </div>
//
//                     <button className="logout-btn" onClick={handleLogout}>
//                         Güvenli Çıkış
//                     </button>
//                 </div>
//             </div>
//         </PageContainer>
//     );
// }
//
// export default ProfilePage;



//ProfilePage.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../container/PageContainer'
import { Button, TextField, Box, Typography, Alert } from '@mui/material'
import '../css/ProfilePage.css'
import logo from '../image/logo.jpg'

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form verileri
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); // Şifre için state

    const [msg, setMsg] = useState(null); // Başarı/Hata mesajı için

    const navigate = useNavigate();

    const fetchProfile = () => {
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
                setUsername(response.data.username);
            })
            .catch(error => {
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            });
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        setMsg(null);
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8080/users/me/update", {
                username: username,
                password: password // Şifre boşsa backend değiştirmez
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMsg({ type: 'success', text: 'Profil başarıyla güncellendi!' });
            setIsEditing(false);
            setPassword(""); // Şifre kutusunu temizle
            fetchProfile();
        } catch (error) {
            setMsg({ type: 'error', text: 'Güncelleme başarısız oldu.' });
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    if (!user) return <div className="profile-container"><h3>Yükleniyor...</h3></div>;

    return (
        <PageContainer>
            <div className="profile-container">
                <div className="profile-card">
                    <img
                        src={logo}
                        alt="Profile"
                        className="profile-avatar"
                    />

                    <h2 className="profile-title">Hoş Geldiniz</h2>

                    {msg && <Alert severity={msg.type} sx={{mb:2}}>{msg.text}</Alert>}

                    {isEditing ? (
                        <Box sx={{ my: 2 }}>
                            {/* KULLANICI ADI INPUTU */}
                            <TextField
                                label="Kullanıcı Adı"
                                variant="outlined"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    mb: 2,
                                    /* Input Stilleri */
                                    "& .MuiInputBase-input": { color: "white" }, // İçine yazılan yazı rengi
                                    "& .MuiInputLabel-root": { color: "#aaa" }, // Label (Başlık) rengi
                                    "& .MuiInputLabel-root.Mui-focused": { color: "#fff" }, // Tıklanınca Label rengi
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" }, // Normal çerçeve
                                        "&:hover fieldset": { borderColor: "white" }, // Üzerine gelince çerçeve
                                        "&.Mui-focused fieldset": { borderColor: "#fff" } // Tıklanınca çerçeve
                                    }
                                }}
                            />

                            {/* ŞİFRE INPUTU */}
                            <TextField
                                label="Yeni Şifre (Değiştirmek istemiyorsan boş bırak)"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    mb: 2,
                                    /* Input Stilleri */
                                    "& .MuiInputBase-input": { color: "white" },
                                    "& .MuiInputLabel-root": { color: "#aaa" },
                                    "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                                        "&:hover fieldset": { borderColor: "white" },
                                        "&.Mui-focused fieldset": { borderColor: "#fff" }
                                    }
                                }}
                            />

                            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                {/* KAYDET BUTONU - Yeşil ve Dolu */}
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    onClick={handleUpdate}
                                    sx={{ fontWeight: 'bold', height: '45px' }} // Biraz daha dolgun durması için
                                >
                                    KAYDET
                                </Button>

                                {/* İPTAL BUTONU - Kırmızı ve Dolu */}
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    onClick={() => { setIsEditing(false); setMsg(null); }}
                                    sx={{ fontWeight: 'bold', height: '45px' }}
                                >
                                    İPTAL
                                </Button>
                            </div>
                        </Box>
                    ) : (
                        <>
                            <div className="profile-info-box">
                                <div className="info-row">
                                    <span className="info-label">Kullanıcı Adı:</span>
                                    <span className="info-value">{user.username}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Email:</span>
                                    <span className="info-value">{user.email}</span>
                                </div>
                            </div>

                            <Button
                                variant="contained"
                                sx={{ bgcolor: 'black', mb: 2 }}
                                fullWidth
                                onClick={() => setIsEditing(true)}
                            >
                                Bilgileri Düzenle
                            </Button>
                        </>
                    )}

                    <button className="logout-btn" onClick={handleLogout}>
                        Güvenli Çıkış
                    </button>
                </div>
            </div>
        </PageContainer>
    )
}

export default ProfilePage