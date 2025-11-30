import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from "./redux/store.jsx";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";


/*axios.interceptors.response.use(
    (response) => {
        return response; // Hata yoksa devam et
    },
    (error) => {
        // Hata varsa buraya düşer
        if (error.response && error.response.status === 401) {
            console.warn("Oturum süresi doldu, çıkış yapılıyor...");
            localStorage.removeItem("token"); // Tokenı sil
            window.location.href = "/login";  // Kullanıcıyı giriş yapması için logine gönder tekrar.
        }
        return Promise.reject(error);
    }
);*/

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>

  </Provider>,
)
