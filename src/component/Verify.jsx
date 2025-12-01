import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { verify } from '../redux/slices/authenticationSlice'

function Verify() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleVerify = async (e) => {
        e.preventDefault();
        setError("");

        try {

            await dispatch(
                verify({
                    email: email,
                    verificationCode: code
                })
            ).unwrap();
            // başarılıysa direkt devam eder, hatada throw eder

            alert("Hesabınız başarıyla doğrulandı! Şimdi giriş yapabilirsiniz.");
            navigate("/login");

        } catch (err) {
            console.error("Doğrulama hatası:", err);

            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                "Doğrulama başarısız. Kod yanlış veya süresi dolmuş olabilir.";

            setError(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <h3>Hesap Doğrulama</h3>
            <p style={{fontSize:'14px', marginBottom:'20px', color:'#555'}}>
                Lütfen e-postanıza gelen doğrulama kodunu giriniz.
            </p>
            <form onSubmit={handleVerify}>
                <div>
                    <input
                        type="email"
                        placeholder="Email Adresiniz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <div>
                    <input
                        type="text"
                        placeholder="Doğrulama Kodu"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                <br/>

                {error && <p style={{color:'red'}}>{error}</p>}

                <button type="submit">Doğrula</button>
            </form>
        </div>
    )
}

export default Verify
