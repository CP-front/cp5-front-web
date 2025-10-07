import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Error from './routes/Error'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './routes/Home'
import Planos from './routes/Planos'
import Sobre from './routes/Sobre'

function App() {
  return (
    <BrowserRouter>
      {/* Navbar fixa no topo */}
      <Nav />

      {/* Conteúdo principal (as páginas) */}
      <div className="min-h-screen bg-[#f2f2f2]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>

      {/* Footer fixo no final */}
      <Footer />
    </BrowserRouter>
  );
}

export default App