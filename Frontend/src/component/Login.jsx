import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login(){

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/auth/login",{
                email,
                password
            });

            if(response.data.token){
                // Token'ı kaydettik.
                localStorage.setItem("token", response.data.token);
                console.log("token kaydedildi.", response.data.token);

                // Giriş başarılı olduğu için oyun sayfasına git.
                navigate("/profile");
            }
        }catch(err){
            setError("Giriş başarısız oldu.");
            console.log("Giriş başarısız oldu.");
        }
    }

return (
        <div className="login-container">
            <h3>Giriş Yap</h3>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Kullanıcı Adı"
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
                {error && <p style={{color:'red'}}>{error}</p>}

                <button type="submit">Giriş Yap</button>
            </form>
        </div>
)
}

export default Login


