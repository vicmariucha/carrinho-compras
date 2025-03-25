// sk_test_51Qps62J20p1jW6QzlUElL82crjNTahHfr2gdbxdXtegeO67mvWWKFGVbt6WUTbcQUejIl5MguEVWISEbdShgJaho00DoNh0hq2
// Café: price_1QpsgjJ20p1jW6Qz6D25vTiE
// Oculos de sol: price_1QpsgjJ20p1jW6Qz6D25vTiE
// Camera: price_1QpsjvJ20p1jW6Qzl90BjyVH

 const express = require('express');
 var cors = require('cors'); 
 const stripe = require('stripe')('sk_test_51Qps62J20p1jW6QzlUElL82crjNTahHfr2gdbxdXtegeO67mvWWKFGVbt6WUTbcQUejIl5MguEVWISEbdShgJaho00DoNh0hq2');

 const app = express();
 app.use(cors());
 app.use(express.static("public"));
 app.use(express.json());

 app.post("/checkout", async(req, res) => {
    /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]
    
    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        sucesso_url: "http://localhost:3000/sucesso",
        cancelar_url: "http://localhost:3000/cancelar"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
 });

 app.listen(4000, () => console.log("Rodando na porta 4000!"))