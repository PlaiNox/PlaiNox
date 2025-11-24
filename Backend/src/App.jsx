
import './App.css'
import PageContainer from "./container/PageContainer.jsx";
import Header from "./component/Header.jsx";
import RouterConfig from "./config/RouterConfig.jsx";

function App() {

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
