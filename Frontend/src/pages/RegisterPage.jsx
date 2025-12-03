import React from 'react'
import Register from "../component/Register.jsx"

function RegisterPage(){
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh', // Sayfayı dikeyde ortalar
            // backgroundColor sildik, arkadaki yıldızlar görünecek
        }}>
            <Register />
        </div>
    )
}
export default RegisterPage