const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Qps62J20p1jW6QzlUElL82crjNTahHfr2gdbxdXtegeO67mvWWKFGVbt6WUTbcQUejIl5MguEVWISEbdShgJaho00DoNh0hq2');

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    try {
        const items = req.body.items;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Formato de items inválido' });
        }

        const lineItems = items.map((item) => ({
            price: item.id, // deve ser o price_xxx de preço único
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment', // modo correto para compras únicas
            success_url: "http://localhost:3000/sucesso",
            cancel_url: "http://localhost:3000/cancelar"
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Erro no checkout:", err.message);
        res.status(500).json({ error: "Erro ao criar sessão de checkout" });
    }
});

app.listen(4000, () => console.log("✅ Backend rodando na porta 4000!"));
