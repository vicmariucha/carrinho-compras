import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/navbar';
import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Cancelar from './pages/cancelar';
import Loja from './pages/loja';
import Sucesso from './pages/sucesso';
import CarrinhoProvider from './carrinhoContexto';

function App() {
  return (
    <CarrinhoProvider>
      <Container>
        <NavbarComponent></NavbarComponent>
        <BrowserRouter>
          <Routes>
            <Route index element={<Loja />} />
            <Route path="sucesso" element={<Sucesso />} />
            <Route path="cancelar" element={<Cancelar />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </CarrinhoProvider>
  );
}

export default App;