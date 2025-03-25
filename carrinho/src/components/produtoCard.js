import { Card, Button, Form, Row, Col, CardBody } from 'react-bootstrap';
import { CarrinhoContexto } from '../carrinhoContexto';
import { useContext } from 'react';

function ProdutoCard(props){ // props.produto -> produto vendendo
   
    const produto = props.produto;
    const carrinho = useContext(CarrinhoContexto);
    const quantidadeProduto = carrinho.getQuantidadeProduto(produto.id); 
    console.log(carrinho.items);

    return(
        <Card>
            <Card.Body>
                <Card.Title>{produto.titulo}</Card.Title>
                <Card.Text>{produto.price}</Card.Text>
                {quantidadeProduto > 0 ?
                    <>
                        <Form as={Row}>
                            <Form.Label column="true" sm="6">No carrinho: {quantidadeProduto}</Form.Label>
                            <Col sm="6">
                                <Button sm="6" onClick={() => carrinho.addUmCarrinho(produto.id)} className="mx-2">+</Button>
                                <Button sm="6" onClick={() => carrinho.removerUmCarrinho(produto.id)} className="mx-2">-</Button>
                            </Col>
                        </Form>
                        <Button variant="danger" onClick={() => carrinho.deletarUmCarrinho(produto.id)} className="my-2" >Remover do carrinho</Button>
                    </>
                    :
                    <Button variant="primary" onClick={() => carrinho.addUmCarrinho(produto.id)}>Adicionar ao carrinho</Button>
                }
            </Card.Body>
        </Card>
    )
}

export default ProdutoCard;