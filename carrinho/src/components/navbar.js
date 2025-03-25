import {Button, Container, Navbar, Modal} from 'react-bootstrap'
import {useState, useContext} from 'react';
import { CarrinhoContexto } from '../carrinhoContexto';
import { produtosArray } from '../produtosLoja';
import ProdutoCard from './produtoCard';
import ProdutoCarrinho from './produtoCarrinho';

function NavbarComponent(){
    const carrinho = useContext(CarrinhoContexto);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async() => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: carrinho.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url){
                window.location.assign(response.url);
            }
        })
    }

    const produtosConta = carrinho.items.reduce((sum, produto) => sum + produto.quantity, 0);


    return(
        <>
            <Navbar expand="sm">
                <Navbar.Brand href='./'>Lojinha Mariucha</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={handleShow}>Carrinho ({produtosConta} items)</Button>
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
                                <ProdutoCarrinho key={idx} id={produtoAtual.id} quantity={produtoAtual.quantity}></ProdutoCarrinho>
                            ))}

                            <h1>Total: {carrinho.getCustoTotal().toFixed(2)}</h1>

                            <Button variant="success" onClick={checkout}>Comprar itens!</Button>
                        </>
                    :
                        <h1>Não há itens no seu carrinho!</h1>
                    }
                </Modal.Body>
            </Modal>
        </>
        
    )
}

export default NavbarComponent;