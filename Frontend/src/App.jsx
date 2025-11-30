import React from "react";
import './App.css'
import PageContainer from "./container/PageContainer.jsx";
import Header from "./component/Header.jsx";
import RouterConfig from "./config/RouterConfig.jsx";
import { useEffect } from 'react';
import axios from "axios";

function App() {
    // Eeğer localStorage'da token varsa bu token hala geçerli mi diye kontol eder.
    /*useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){

                    // Backende istek at token süresi geçerli mi diye
                    axios.get("http://localhost:8080/users/me", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log("Token sağlam, kullanıcı:", response.data.email);
                    })
                    .catch(error => {
                        console.log("Token hatası. Interceptor devreye girecek.");
                        // Burada bir şey yapmaya gerek yok, main.jsx'teki gözcü halledecek.
                        //Buraya girmeden önce oraya gidecek.
                    });
                }
    }, []);*/


    return (
        <div>
            <PageContainer>
                <Header/>
                <RouterConfig />


            </PageContainer>
        </div>
    );
}

export default App
