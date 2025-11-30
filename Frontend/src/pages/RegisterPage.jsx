import React from 'react'
import Register from "../component/Register.jsx"

function RegisterPage(){
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5'
        }}>
            <Register />
        </div>
    )
}
export default RegisterPage