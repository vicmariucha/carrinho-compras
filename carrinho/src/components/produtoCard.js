import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CarrinhoContexto } from '../carrinhoContexto';
import { useContext } from 'react';

function ProdutoCard(props) { 
    const produto = props.produto;
    const carrinho = useContext(CarrinhoContexto);
    const quantidadeProduto = carrinho.getQuantidadeProduto(produto.id); 

    return (
        <Card>
            <Card.Body>
                <Card.Img variant="top" src={produto.imagem} alt={produto.titulo} />
                <Card.Title>{produto.titulo}</Card.Title>
                <Card.Text>R${produto.preco}</Card.Text>
                {quantidadeProduto > 0 ?
                    <>
                        <Form as={Row}>
                            <Form.Label column="true" sm="6">Quantidade no carrinho: {quantidadeProduto}</Form.Label>
                            <Col sm="6">
                                <Button sm="6" onClick={() => carrinho.adicionarAoCarrinho(produto.id)} className="mx-2">+</Button>
                                <Button sm="6" onClick={() => carrinho.removerDoCarrinho(produto.id)} className="mx-2">-</Button>
                            </Col>
                        </Form>
                        <Button variant="danger" onClick={() => carrinho.deletarDoCarrinho(produto.id)} className="my-2">Remover do carrinho</Button>
                    </>
                    :
                    <Button variant="primary" onClick={() => carrinho.adicionarAoCarrinho(produto.id)}>Adicionar ao carrinho</Button>
                }
            </Card.Body>
        </Card>
    );
}

export default ProdutoCard;