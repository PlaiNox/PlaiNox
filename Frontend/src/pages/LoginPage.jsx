import React from 'react'
import Login from "../component/Login.jsx"
function LoginPage(){


    return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5'
            }}>
                {/* Login formunu buraya yerleştiriyoruz */}
                <Login />
            </div>
    )
}
export default LoginPage