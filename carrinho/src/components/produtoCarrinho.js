import Button from 'react-bootstrap/Button';
import { CarrinhoContexto } from '../carrinhoContexto';
import { useContext } from 'react';
import { getProdutoData } from '../produtosLoja';

function ProdutoCarrinho (props) {
    const carrinho = useContext(CarrinhoContexto);
    const id = props.id;
    const quantidade = props.quantidade;
    const produtoDado = getProdutoData(id);

    return(
        <>
            <h3>{produtoDado.titulo}</h3>
            <p>{quantidade} no total</p>
            <p>R${ (quantidade * produtoDado.preco).toFixed(2) }</p>
            <Button size="sm" onClick={() => carrinho.deletarUmCarrinho(id)}>Remover</Button>
            <hr></hr>
        </>
    )
}

export default ProdutoCarrinho;