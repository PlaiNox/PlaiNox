import React from 'react';
import PageContainer from "./container/PageContainer.jsx";
import Header from "./component/Header.jsx";
import RouterConfig from "./config/RouterConfig.jsx";

// --- CSS STYLES (Normalde App.css veya index.css içinde olacaklar) ---
const styles = `
  /* Tüm sayfa ayarları */
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
    overflow-x: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* Yıldızların olduğu kapsayıcı */
  .app-background {
    position: relative;
    width: 100%;
    min-height: 100vh;
  }

  /* --- YILDIZ ANİMASYONU --- */
  @keyframes animStar {
    from { transform: translateY(0px); }
    to { transform: translateY(-2000px); }
  }

  /* --- KÜÇÜK YILDIZLAR --- */
  #stars {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: 
      100px 200px #FFF, 300px 600px #FFF, 500px 100px #FFF, 800px 400px #FFF, 
      1200px 900px #FFF, 1500px 200px #FFF, 1700px 800px #FFF, 200px 1200px #FFF,
      450px 1500px #FFF, 900px 1800px #FFF, 50px 50px #FFF, 600px 300px #FFF,
      1100px 600px #FFF, 1400px 100px #FFF, 1600px 1400px #FFF, 250px 850px #FFF,
      750px 1250px #FFF, 1300px 1600px #FFF, 1900px 300px #FFF, 1000px 700px #FFF,
      150px 1900px #FFF, 1800px 1100px #FFF, 350px 450px #FFF, 650px 950px #FFF,
      950px 1350px #FFF, 1250px 1750px #FFF, 1550px 150px #FFF, 1850px 550px #FFF,
      400px 1000px #FFF, 700px 1400px #FFF, 100px 1600px #FFF, 1600px 400px #FFF;
    animation: animStar 50s linear infinite;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0; /* İçeriğin arkasında */
  }
  
  #stars::after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: 
      100px 200px #FFF, 300px 600px #FFF, 500px 100px #FFF, 800px 400px #FFF, 
      1200px 900px #FFF, 1500px 200px #FFF, 1700px 800px #FFF, 200px 1200px #FFF,
      450px 1500px #FFF, 900px 1800px #FFF, 50px 50px #FFF, 600px 300px #FFF,
      1100px 600px #FFF, 1400px 100px #FFF, 1600px 1400px #FFF, 250px 850px #FFF,
      750px 1250px #FFF, 1300px 1600px #FFF, 1900px 300px #FFF, 1000px 700px #FFF,
      150px 1900px #FFF, 1800px 1100px #FFF, 350px 450px #FFF, 650px 950px #FFF,
      950px 1350px #FFF, 1250px 1750px #FFF, 1550px 150px #FFF, 1850px 550px #FFF,
      400px 1000px #FFF, 700px 1400px #FFF, 100px 1600px #FFF, 1600px 400px #FFF;
  }

  /* --- ORTA BOY YILDIZLAR --- */
  #stars2 {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: 
      200px 400px #FFF, 600px 100px #FFF, 900px 800px #FFF, 1300px 300px #FFF,
      1600px 1200px #FFF, 300px 1500px #FFF, 800px 1700px #FFF, 100px 900px #FFF,
      1100px 1400px #FFF, 1400px 600px #FFF, 1800px 150px #FFF, 500px 1100px #FFF;
    animation: animStar 100s linear infinite;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
  }
  
  #stars2::after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: 
      200px 400px #FFF, 600px 100px #FFF, 900px 800px #FFF, 1300px 300px #FFF,
      1600px 1200px #FFF, 300px 1500px #FFF, 800px 1700px #FFF, 100px 900px #FFF,
      1100px 1400px #FFF, 1400px 600px #FFF, 1800px 150px #FFF, 500px 1100px #FFF;
  }

  /* --- BÜYÜK YILDIZLAR --- */
  #stars3 {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: 
      400px 800px #FFF, 1000px 200px #FFF, 1500px 1200px #FFF, 200px 1600px #FFF,
      1200px 1800px #FFF, 1800px 600px #FFF, 600px 1400px #FFF;
    animation: animStar 150s linear infinite;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
  }
  
  #stars3::after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: 
      400px 800px #FFF, 1000px 200px #FFF, 1500px 1200px #FFF, 200px 1600px #FFF,
      1200px 1800px #FFF, 1800px 600px #FFF, 600px 1400px #FFF;
  }

  /* --- İÇERİK STİLLERİ --- */
  .page-content {
    position: relative;
    z-index: 10; /* Yıldızların üstünde olması için */
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    color: white;
    margin-bottom: 40px;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }

  .card {
    background: rgba(255, 255, 255, 0.05); /* ŞEFFAFLIK ÖNEMLİ */
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 15px;
    color: white;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.1);
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
  }

  .card-img {
    width: 100%;
    height: 150px;
    background-color: #333;
    border-radius: 8px;
    margin-bottom: 15px;
    object-fit: cover;
  }
  
  .btn {
    background-color: #000;
    color: white;
    border: 1px solid #333;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
    font-weight: bold;
  }
`;



// --- ANA APP BİLEŞENİ ---

function App() {
    return (
        <div className="app-background">
            {/* CSS'i buraya inject ediyoruz (Önizleme için) */}
            <style>{styles}</style>

            {/* Yıldız Katmanları (Arka Plan) */}
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>

            <div id="stars2"></div>
            <div id="stars3"></div>

            {/* Mevcut İçerik (Ön Plan) */}
            <PageContainer>
                <Header/>
                <RouterConfig />
            </PageContainer>

        </div>
    );
}

export default App;