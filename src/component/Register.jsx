import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../redux/slices/authenticationSlice'
import { Paper, Typography, TextField, Button, Alert, Box } from '@mui/material'

function Register() {
    // Form verileri için state'ler
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Hata mesajı ve Yükleniyor durumu
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await dispatch(register({ username, email, password })).unwrap();

            alert("Kayıt işleminiz alındı! Lütfen e-postanızı kontrol edin.");
            navigate("/verify");

        } catch (err) {
            console.error("Kayıt hatası:", err);
            const errorMessage = err?.response?.data?.message || err?.message || "Kayıt başarısız oldu.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    // Login sayfasıyla uyumlu input stilleri
    const inputStyle = {
        "& .MuiInputBase-input": { color: "white" },
        "& .MuiInputLabel-root": { color: "#94a3b8" }, // Soluk gri label
        "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" }, // Odaklanınca mavi
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "rgba(255,255,255,0.3)" }, // Varsayılan kenarlık
            "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" }, // Hover kenarlık
            "&.Mui-focused fieldset": { borderColor: "#60a5fa" }, // Odaklanınca kenarlık
        }
    };

    return (
        <Paper
            elevation={4}
            sx={{
                padding: 4,
                width: 380,
                borderRadius: 4,
                // --- GLASSMORPHISM STİLİ ---
                background: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}
        >
            <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
                Kayıt Ol
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={handleRegister}>
                <TextField
                    fullWidth
                    label="Kullanıcı Adı"
                    type="text"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    sx={inputStyle}
                />

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={inputStyle}
                />

                <TextField
                    fullWidth
                    label="Şifre"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={inputStyle}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                        mt: 3,
                        py: 1.2,
                        fontWeight: 'bold',
                        bgcolor: "#3b82f6", // Mavi buton
                        ":hover": { bgcolor: "#2563eb" },
                        "&.Mui-disabled": { bgcolor: "rgba(59, 130, 246, 0.5)", color: "#ccc" }
                    }}
                >
                    {loading ? "İşleniyor..." : "Kayıt Ol"}
                </Button>
            </form>

            <Box mt={3} textAlign="center">
                <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                    Zaten hesabın var mı?{" "}
                    <span
                        style={{ color: '#60a5fa', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => navigate("/login")}
                    >
                        Giriş Yap
                    </span>
                </Typography>
            </Box>
        </Paper>
    )
}

export default Register