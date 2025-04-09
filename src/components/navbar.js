import { Button, Navbar, Modal, Spinner } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CarrinhoContexto } from '../carrinhoContexto';
import ProdutoCarrinho from './produtoCarrinho';

function NavbarComponent() {
    const carrinho = useContext(CarrinhoContexto);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        if (carrinho.items.length === 0) {
            alert("Seu carrinho está vazio! Adicione itens antes de finalizar a compra.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/checkout`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items: carrinho.items })
            });

            if (!response.ok) {
                throw new Error("Erro na resposta do servidor");
            }

            const data = await response.json();

            if (data.url) {
                window.location.assign(data.url);
            } else {
                alert("Algo deu errado. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro durante o checkout:", error);
            alert("Não conseguimos iniciar o pagamento. Verifique sua conexão e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const produtosConta = carrinho.items.reduce((sum, produto) => sum + produto.quantity, 0);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href='./'>Lojinha Mariucha</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={handleShow}>Carrinho ({produtosConta} itens)</Button>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Carrinho de compras</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {produtosConta > 0 ? (
                        <>
                            <p>Itens no seu carrinho:</p>
                            {carrinho.items.map((produtoAtual, idx) => (
                                <ProdutoCarrinho
                                    key={idx}
                                    id={produtoAtual.id}
                                    quantidade={produtoAtual.quantity}
                                />
                            ))}
                            <h1>Total: R$ {carrinho.getCustoTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h1>
                            <Button variant="success" onClick={checkout} disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Processando...
                                    </>
                                ) : (
                                    'Finalizar compra'
                                )}
                            </Button>
                        </>
                    ) : (
                        <h4>Não há itens no seu carrinho.</h4>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NavbarComponent;
