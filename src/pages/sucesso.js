import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sucesso() {
    return (
        <Container className="text-center mt-5">
            <h1 className="mb-4">🎉 Obrigada pela sua compra!</h1>
            <p className="mb-4">Seu pedido foi processado com sucesso. Esperamos vê-lo(a) novamente em breve!</p>
            <Link to="/">
                <Button variant="primary">Voltar para a loja</Button>
            </Link>
        </Container>
    );
}

export default Sucesso;
