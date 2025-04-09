const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.post("/checkout", async (req, res) => {
    try {
        const items = req.body.items;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Formato de items inválido' });
        }

        console.log("🛒 Itens recebidos no checkout:", items);

        const lineItems = items.map((item) => ({
            price: item.id,
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: process.env.SUCCESS_URL,
            cancel_url: process.env.CANCEL_URL
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("❌ Erro no checkout:", err.message);
        res.status(500).json({ error: "Erro ao criar sessão de checkout" });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend rodando na porta ${PORT}!`));
