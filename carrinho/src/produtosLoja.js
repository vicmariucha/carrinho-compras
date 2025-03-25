const produtosArray = [
    {
        id: "price_1QpsgjJ20p1jW6Qz6D25vTiE",
        titulo: "Café",
        price: 4.90
    },
    {
        id: "price_1QpsjAJ20p1jW6QzhCJeuJHg",
        titulo: "Oculos de sol",
        price: 5.45
    },
    {
        id: "price_1QpsjvJ20p1jW6Qzl90BjyVH",
        titulo: "Camera",
        price: 54.90
    },
]

function getProdutoData(id){
    let produtoDado = produtosArray.find(produto => produto.id === id)

    if (produtoDado === undefined){
        console.log("Dados do produto não existentes para o ID: " + id);
        return undefined;
    }

    return produtoDado;
}


export {produtosArray, getProdutoData};