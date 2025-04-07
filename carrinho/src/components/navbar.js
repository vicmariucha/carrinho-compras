import { Button, Navbar, Modal, Container } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CarrinhoContexto } from '../carrinhoContexto';
import ProdutoCarrinho from './produtoCarrinho';
import { FaShoppingCart } from 'react-icons/fa'; // Ícone de carrinho

function NavbarComponent() {
    const carrinho = useContext(CarrinhoContexto);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        try {
            const response = await fetch('http://localhost:4000/checkout', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items: carrinho.items })
            });

            const data = await response.json();
            if (data.url) {
                window.location.assign(data.url);
            }
        } catch (error) {
            alert("Erro ao iniciar o pagamento.");
        }
    };

    const produtosConta = carrinho.items.reduce((sum, produto) => sum + produto.quantity, 0);

    return (
        <>
            <Navbar expand="sm" className="navbar-custom">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand href="/" className="navbar-title">🛍️ Lojinha Mariucha</Navbar.Brand>
                    <Button variant="outline-primary" onClick={handleShow} className="cart-btn">
                        <FaShoppingCart style={{ marginRight: '8px' }} />
                        Carrinho ({produtosConta})
                    </Button>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Carrinho de compras</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {produtosConta > 0 ? 
                        <>
                            <p>Itens no seu carrinho:</p>
                            {carrinho.items.map((produtoAtual, idx) => (
                                <ProdutoCarrinho
                                    key={idx}
                                    id={produtoAtual.id}
                                    quantidade={produtoAtual.quantity}
                                />
                            ))}
                            <h4>Total: R$ {carrinho.getCustoTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
                            <Button variant="success" onClick={checkout} className="mt-3">Comprar</Button>
                        </>
                        :
                        <h5>Seu carrinho está vazio!</h5>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NavbarComponent;
