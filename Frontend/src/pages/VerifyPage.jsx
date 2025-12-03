import React from 'react'
import Verify from "../component/Verify.jsx"

function VerifyPage(){
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            // background color yok
        }}>
            <Verify />
        </div>
    )
}
export default VerifyPage