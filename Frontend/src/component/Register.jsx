import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    // Form verileri için state'ler
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Hata mesajı ve Yükleniyor durumu için state'ler
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Butonu kilitlemek için

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // İşlem başladığı için butonu kilitliyoruz ve hatayı temizleniyor
        setLoading(true);
        setError("");

        try {
            // Backend'e kayıt isteği atıyoruz
            const response = await axios.post("http://localhost:8080/auth/signup", {
                username,
                email,
                password
            });
            
            console.log("Kayıt başarılı:", response.data);
            alert("Kayıt işleminiz alındı! Lütfen e-postanızı kontrol edin.");
            
            // Başarılı olursa Doğrulama sayfasına gönder
            navigate("/verify"); 

        } catch (err) {
            console.error("Kayıt hatası:", err);
            // Backend'den gelen özel bir hata mesajı varsa onu göster, yoksa genel mesaj yaz
            const errorMessage = err.response?.data?.message || "Kayıt başarısız oldu. Bilgileri kontrol edin.";
            setError(errorMessage);
        } finally {
            // İşlem bitince butonu tekrar açıyoruz
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <h3>Kayıt Ol</h3>
            <form onSubmit={handleRegister}>
                <div>
                    <input
                        type="text"
                        placeholder="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <div>
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <br/>
                
                {error && <p style={{color:'red', fontSize:'14px', marginBottom:'10px'}}>{error}</p>}

                <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                    {loading ? "İşleniyor..." : "Kayıt Ol"}
                </button>
            </form>
            
            <p style={{marginTop: '15px', fontSize: '14px'}}>
                Zaten hesabın var mı? <span 
                    style={{color: 'blue', cursor: 'pointer', fontWeight: 'bold'}} 
                    onClick={() => navigate("/login")}
                >
                    Giriş Yap
                </span>
            </p>
        </div>
    )
}

export default Register