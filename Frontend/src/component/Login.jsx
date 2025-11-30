import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../redux/slices/authenticationSlice.jsx";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    Alert,
} from "@mui/material";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Eğer backend hata dönerse Redux state’inden okuyacağız
    const [localError, setLocalError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await dispatch(
                authenticate({ email, password })
            ).unwrap();

            // Token geldiyse kaydediyoruz
            if (result.token) {
                localStorage.setItem("token", result.token);

                console.log("Token kaydedildi:", result.token);

                // Login sonrası profile git
                navigate("/profile");
            }
        } catch (err) {
            console.error("Login hata:", err);
            setLocalError("Giriş başarısız oldu. Bilgileri kontrol edin.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 10,
            }}
        >
            <Paper
                elevation={4}
                sx={{ padding: 4, width: 360, borderRadius: 3 }}
            >
                <Typography variant="h5" mb={2}>
                    Giriş Yap
                </Typography>

                {localError && <Alert severity="error">{localError}</Alert>}

                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Şifre"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2,
                            bgcolor: "#1976d2",
                            ":hover": { bgcolor: "#115293" },
                        }}
                    >
                        Giriş Yap
                    </Button>
                </form>

                <Box mt={2}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ cursor: "pointer" }}
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