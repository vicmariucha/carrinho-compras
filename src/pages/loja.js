import { useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { produtosArray } from '../produtosLoja';
import ProdutoCard from '../components/produtoCard';
import { CarrinhoContexto } from '../carrinhoContexto';

function Loja() {
    const carrinho = useContext(CarrinhoContexto);

    useEffect(() => {
        const url = new URL(window.location.href);
        const voltouDoStripe = url.searchParams.get('canceled');

        if (voltouDoStripe) {
            console.log("⚠️ Voltou do Stripe — limpando carrinho...");
            carrinho.items.forEach(item => {
                carrinho.deletarDoCarrinho(item.id);
            });
        }
    }, []);

    return (
        <>
            <h1 align="center" className="p-3">Bem vindo à Loja!</h1>
            <Row xs={1} md={3} className="g-4">
                {produtosArray.map((produto, idx) => (
                    <Col align="center" key={idx}>
                        <ProdutoCard produto={produto} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Loja;
