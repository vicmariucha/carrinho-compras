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
        console.log("Iniciando checkout...");
        console.log("Itens no carrinho:", carrinho.items);

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
            console.log("Resposta recebida do backend:", data);

            if (data.url) {
                window.location.assign(data.url);
            } else {
                console.warn("A resposta não contém a URL de redirecionamento.");
            }
        } catch (error) {
            console.error("Erro durante o checkout:", error);
            alert("Erro ao iniciar o pagamento. Verifique se o backend está rodando e tente novamente.");
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
