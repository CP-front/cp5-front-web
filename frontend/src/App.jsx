import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './components/AuthContext';
import Error from './routes/Error'
import Nav from './components/Nav'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './routes/Home'
import Planos from './routes/Planos'
import Sobre from './routes/Sobre'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Navbar fixa no topo */}
        <Header/>

        {/* Conteúdo principal (as páginas) */}
        <div className="min-h-screen bg-[#f2f2f2]">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/planos" element={<Planos/>} />
            <Route path="/sobre" element={<Sobre/>} />
            <Route path="*" element={<Error/>} />
          </Routes>
        </div>

        {/* Footer fixo no final */}
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
