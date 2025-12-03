import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../redux/slices/authenticationSlice.jsx";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper, Alert } from "@mui/material";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(authenticate({ email, password })).unwrap();
            if (result.token) {
                localStorage.setItem("token", result.token);
                navigate("/profile");
            }
        } catch (err) {
            console.error("Login hata:", err);
            setLocalError("Giriş başarısız. Bilgileri kontrol edin.");
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    width: 360,
                    borderRadius: 4,
                    // --- GLASSMORPHISM STİLİ ---
                    background: "rgba(30, 41, 59, 0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "white", // Genel yazı rengi
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                }}
            >
                <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
                    Giriş Yap
                </Typography>

                {localError && <Alert severity="error" sx={{ mb: 2 }}>{localError}</Alert>}

                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        // Input stilleri (Koyu zemin için)
                        sx={{
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiInputLabel-root": { color: "#94a3b8" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                                "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Şifre"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiInputLabel-root": { color: "#94a3b8" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                                "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
                            }
                        }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            py: 1.2,
                            fontWeight: 'bold',
                            bgcolor: "#3b82f6",
                            ":hover": { bgcolor: "#2563eb" },
                        }}
                    >
                        Giriş Yap
                    </Button>
                </form>

                <Box mt={3} textAlign="center">
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#cbd5e1",
                            cursor: "pointer",
                            "&:hover": { color: "#60a5fa", textDecoration: 'underline' }
                        }}
                        onClick={() => navigate("/register")}
                    >
                        Hesabın yok mu? Kayıt ol
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;