import { createContext, useState } from "react";
import { getDadosProduto } from "./produtosLoja";

export const CarrinhoContexto = createContext({
    items: [],
    getQuantidadeProduto: () => {},
    adicionarAoCarrinho: () => {},
    removerDoCarrinho: () => {},
    deletarDoCarrinho: () => {},
    getCustoTotal: () => {}
});

export function CarrinhoProvider({ children }) {
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);

    function getQuantidadeProduto(id) {
        return produtosCarrinho.find(produto => produto.id === id)?.quantity ?? 0; // Certifique-se de que 'quantity' está sendo utilizado
    }

    function adicionarAoCarrinho(id) {
        setProdutosCarrinho(prevProdutos => {
            const quantidade = getQuantidadeProduto(id);
            const novoCarrinho = quantidade === 0
                ? [...prevProdutos, { id, quantity: 1 }] // 'quantity' em vez de 'quantidade'
                : prevProdutos.map(produto =>
                    produto.id === id
                        ? { ...produto, quantity: produto.quantity + 1 } // 'quantity' em vez de 'quantidade'
                        : produto
                );
            
            console.log("Produto adicionado ao carrinho:", novoCarrinho);
            return novoCarrinho;
        });
    }

    function removerDoCarrinho(id) {
        setProdutosCarrinho(prevProdutos => {
            const quantidade = getQuantidadeProduto(id);
            const novoCarrinho = quantidade === 1
                ? prevProdutos.filter(produto => produto.id !== id)
                : prevProdutos.map(produto =>
                    produto.id === id
                        ? { ...produto, quantity: produto.quantity - 1 } // 'quantity' em vez de 'quantidade'
                        : produto
                );
            
            console.log("Produto removido do carrinho:", novoCarrinho);
            return novoCarrinho;
        });
    }

    function deletarDoCarrinho(id) {
        setProdutosCarrinho(prevProdutos => {
            const novoCarrinho = prevProdutos.filter(produto => produto.id !== id);
            console.log("Produto deletado do carrinho:", novoCarrinho);
            return novoCarrinho;
        });
    }

    function getCustoTotal() {
        const total = produtosCarrinho.reduce((total, itemCarrinho) => {
            const produtoDado = getDadosProduto(itemCarrinho.id);
            
            console.log(`Verificando produto ID: ${itemCarrinho.id}`, produtoDado);
            
            if (!produtoDado) {
                console.warn(`Produto com ID ${itemCarrinho.id} não encontrado!`);
                return total;
            }

            return total + (produtoDado.preco * (itemCarrinho.quantity ?? 0)); // 'quantity' em vez de 'quantidade'
        }, 0);
        
        console.log("Custo total calculado:", total);
        return total;
    }

    console.log("Estado atual do carrinho:", produtosCarrinho);

    const contextoValue = {
        items: produtosCarrinho,
        getQuantidadeProduto,
        adicionarAoCarrinho,
        removerDoCarrinho,
        deletarDoCarrinho,
        getCustoTotal
    };

    return (
        <CarrinhoContexto.Provider value={contextoValue}>
            {children}
        </CarrinhoContexto.Provider>
    );
}

export default CarrinhoProvider;
