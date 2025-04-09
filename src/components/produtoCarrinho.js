import Button from 'react-bootstrap/Button';
import { CarrinhoContexto } from '../carrinhoContexto';
import { useContext } from 'react';
import { getDadosProduto } from '../produtosLoja';

function ProdutoCarrinho (props) {
    const { removerDoCarrinho } = useContext(CarrinhoContexto); 
    const id = props.id;
    const quantidade = props.quantidade;

    const dadosProduto = getDadosProduto(id);

    if (!dadosProduto) {
        return <p>Produto não encontrado para o ID: {id}</p>;
    }

    return (
        <>
            <h3>{dadosProduto.titulo}</h3>
            <p>Quantidade: {quantidade}</p>
            <p>R${(quantidade * dadosProduto.preco).toFixed(2)}</p>
            <Button size="sm" onClick={() => removerDoCarrinho(id)}>Remover</Button>
            <hr />
        </>
    );
}

export default ProdutoCarrinho;