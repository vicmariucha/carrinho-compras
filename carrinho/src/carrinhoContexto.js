import { createContext, useState } from "react";
import { produtosArray, getProdutoData } from "./produtosLoja";

export const CarrinhoContexto = createContext({
    items: [],
    getQuantidadeProduto: () => {},
    addUmCarrinho: () => {},
    removerUmCarrinho: () => {},
    deletarUmCarrinho: () => {},
    getCustoTotal: () => {}
});

export function CarrinhoProvider({children}){
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);

    function getQuantidadeProduto(id){
        const quantidade = produtosCarrinho.find(produto => produto.id === id)?.quantity;

        if(quantidade === undefined){
            return 0;
        }

        return quantidade;
    }

    function addUmCarrinho(id){
        const quantidade = getQuantidadeProduto(id);

        if (quantidade === 0){ //produto não está no carrinho
            setProdutosCarrinho(
                [
                    ...produtosCarrinho,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            );
        }else { // produto está no carrinho
            setProdutosCarrinho(
                produtosCarrinho.map(
                    produto =>
                    produto.id === id                                 //if
                    ?{...produto, quantity: produto.quantity + 1} //if é verdadeiro
                    : produto                                         // if é falso
                )
            )
        }
    }

    function removerUmCarrinho(id){
        const quantidade = getQuantidadeProduto(id);

        if(quantidade == 1) {
            deletarUmCarrinho(id);
        }else {
            setProdutosCarrinho(
                produtosCarrinho.map(
                    produto =>
                    produto.id === id                                 
                    ?{...produto, quantity: produto.quantity - 1} 
                    : produto                                         
                )
            )
        }
    }

    function deletarUmCarrinho(id){
        setProdutosCarrinho(
            produtosCarrinho =>
            produtosCarrinho.filter(produtoAtual => {
                return produtoAtual.id != id;
            })
        )
    }

    function getCustoTotal(){
        let custoTotal = 0;
        produtosCarrinho.forEach((itemCarrinho) => {
            const produtoDado = getProdutoData(itemCarrinho.id);
            if (produtoDado) {
                custoTotal += (produtoDado.price * (itemCarrinho.quantity ?? 0));
            } else {
                console.warn(`Produto com ID ${itemCarrinho.id} não encontrado!`);
            }
        });
        return custoTotal;
    }

    const contextoValue = {
        items: produtosCarrinho,
        getQuantidadeProduto,
        addUmCarrinho,
        removerUmCarrinho,
        deletarUmCarrinho,
        getCustoTotal
    }
    return(
        <CarrinhoContexto.Provider value={contextoValue}>
            {children}
        </CarrinhoContexto.Provider>
    )
}

export default CarrinhoProvider;

// codigo aqui embaix

// contexto (carrinho, adicionarCarinho, removerCarrinho)
// provider -> da acesso a todos as coisas do react no contexto