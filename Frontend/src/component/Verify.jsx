import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { verify } from '../redux/slices/authenticationSlice'
import { Paper, Typography, TextField, Button, Alert, Box } from '@mui/material'

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
            await dispatch(verify({ email, verificationCode: code })).unwrap();
            alert("Hesabınız başarıyla doğrulandı! Şimdi giriş yapabilirsiniz.");
            navigate("/login");
        } catch (err) {
            console.error("Doğrulama hatası:", err);
            setError("Doğrulama başarısız. Kod yanlış veya süresi dolmuş olabilir.");
        }
    };

    // Stiller Login.jsx ile uyumlu
    const inputStyle = {
        "& .MuiInputBase-input": { color: "white" },
        "& .MuiInputLabel-root": { color: "#94a3b8" },
        "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
            "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
            "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
        }
    };

    return (
        <Paper
            elevation={4}
            sx={{
                padding: 4,
                width: 380,
                borderRadius: 4,
                background: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
                textAlign: 'center'
            }}
        >
            <Typography variant="h5" mb={1} fontWeight="bold">Hesap Doğrulama</Typography>
            <Typography variant="body2" mb={3} sx={{ color: '#cbd5e1' }}>
                Lütfen e-postanıza gelen doğrulama kodunu giriniz.
            </Typography>

            <form onSubmit={handleVerify}>
                <TextField
                    fullWidth
                    label="Email Adresiniz"
                    type="email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={inputStyle}
                />

                <TextField
                    fullWidth
                    label="Doğrulama Kodu"
                    type="text"
                    margin="normal"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    sx={inputStyle}
                />

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        py: 1.2,
                        fontWeight: 'bold',
                        bgcolor: "#10b981", // Yeşil tonu
                        ":hover": { bgcolor: "#059669" }
                    }}
                >
                    Doğrula
                </Button>
            </form>
        </Paper>
    )
}

export default Verify;