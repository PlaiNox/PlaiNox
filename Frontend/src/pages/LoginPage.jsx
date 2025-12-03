import React from 'react'
import Login from "../component/Login.jsx"

function LoginPage(){
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh', // Sayfayı ortalamak için
            // backgroundColor sildik, App.css'teki yıldızlar görünecek
        }}>
            <Login />
        </div>
    )
}
export default LoginPage