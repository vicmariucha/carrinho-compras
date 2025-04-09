import { useEffect, useContext } from 'react';
import { CarrinhoContexto } from '../carrinhoContexto';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Cancelar() {
    const carrinho = useContext(CarrinhoContexto);
    const navigate = useNavigate();

    useEffect(() => {
        carrinho.items.forEach(item => {
            carrinho.deletarDoCarrinho(item.id);
        });
    }, []);

    const voltarParaLoja = () => {
        navigate('/');
    };

    return (
        <Container className="text-center py-5">
            <h1 className="mb-4">😕 Pagamento cancelado</h1>
            <p className="mb-4 fs-5">
                Tudo bem, às vezes a gente muda de ideia! <br />
                Se quiser, você pode voltar para a loja e continuar navegando pelos produtos.
            </p>
            <Button variant="primary" size="lg" onClick={voltarParaLoja}>
                Voltar para a loja
            </Button>
        </Container>
    );
}

export default Cancelar;
