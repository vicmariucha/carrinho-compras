import { Button, Navbar, Modal } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CarrinhoContexto } from '../carrinhoContexto';
import ProdutoCarrinho from './produtoCarrinho';

function NavbarComponent() {
    const carrinho = useContext(CarrinhoContexto);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: carrinho.items })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if (response.url) {
                window.location.assign(response.url);
            }
        });
    };

    const produtosConta = carrinho.items.reduce((sum, produto) => sum + produto.quantity, 0); // Corrigido para 'quantity'

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
                    {produtosConta > 0 ? 
                        <>
                            <p>Itens no seu carrinho:</p>
                            {carrinho.items.map((produtoAtual, idx) => (
                                <ProdutoCarrinho key={idx} id={produtoAtual.id} quantidade={produtoAtual.quantity} /> // Corrigido para 'quantity'
                            ))}
                            <h1>Total: R$ {carrinho.getCustoTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h1>
                            <Button variant="success" onClick={checkout}>Comprar itens!</Button>
                        </>
                        :
                        <h1>Não há itens no seu carrinho!</h1>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NavbarComponent;
