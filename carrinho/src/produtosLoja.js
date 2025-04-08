const produtosArray = [
    {
        id: "price_1QpsgjJ20p1jW6Qz6D25vTiE",
        titulo: "Café",
        preco: 4.90,
        imagem: "/imagens/cafe.jpg",
    },
    {
        id: "price_1QpsjAJ20p1jW6QzhCJeuJHg",
        titulo: "Óculos de sol",
        preco: 5.45,
        imagem: "/imagens/oculos.jpg",
    },
    {
        id: "price_1QpsjvJ20p1jW6Qzl90BjyVH",
        titulo: "Câmera",
        preco: 54.90,
        imagem: "/imagens/camera.jpg",
    },
];

function getDadosProduto(id) {
    console.log("Buscando produto com ID:", id); // Log de verificação do ID
    let dadosProduto = produtosArray.find(produto => produto.id === id);

    if (!dadosProduto) {
        console.warn(`Produto não encontrado para o ID: ${id}`);
        return undefined;
    }

    return dadosProduto;
}

export { produtosArray, getDadosProduto };
