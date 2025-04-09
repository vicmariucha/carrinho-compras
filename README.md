
# 🛒 Carrinho de compras

**Carrinho de compras** é uma aplicação web full stack que simula uma loja online, permitindo aos usuários **adicionar produtos ao carrinho**, **ver o total em tempo real** e **finalizar a compra com integração ao Stripe**.  

O projeto foi desenvolvido com foco em boas práticas de front-end moderno usando **React**, **JavaScript** e **Context API**, além de um backend em **Node.js + Express** para gerenciar o checkout.

> ✅ Aplicação 100% funcional e com deploy no Vercel (frontend) e Render (backend).

---

## ✨ Funcionalidades

- ✅ Adicionar produtos ao carrinho  
- 🧹 Remover produtos do carrinho  
- 🔄 Atualizar a quantidade de itens  
- 💰 Cálculo automático do valor total  
- 💳 Integração com Stripe para pagamentos  
- 📱 Interface responsiva e amigável  

---

## 🛠️ Tecnologias utilizadas

### Frontend
- **React** com **JavaScript**
- **Context API** + `useReducer` para controle de estado
- **CSS customizado**
- **React Bootstrap** para componentes UI

### Backend
- **Node.js** com **Express**
- **Stripe API** para gerenciamento de pagamentos
- **CORS** para permitir comunicação com o frontend

---

## 🔗 Deploys

- **Frontend:** [Vercel](https://carrinho-compras-gj20hrwhs-vicmariuchas-projects.vercel.app/)  
- **Backend:** [Render](https://carrinho-backend.onrender.com)  

---

## 📸 Demonstração

![Demonstração do carrinho de compras](https://cdn.discordapp.com/attachments/1089566799714078840/1359625148835168386/ezgif.com-video-to-gif-converter.gif?ex=67f82918&is=67f6d798&hm=21248e87fc245b767119b3d036ff9458000149e3d91995a9f417af3d0a76b21b&)

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/carrinho-compras.git
cd carrinho-compras
```

### 2. Instale as dependências do frontend

```bash
npm install
npm start
```

### 3. Configure e inicie o backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` com a variável da sua chave secreta do Stripe:

```env
STRIPE_SECRET_KEY=sua-chave-secreta
```

Depois:

```bash
node server.js
```

---

## 📦 Estrutura do projeto

```bash
carrinho-compras/
├── backend/          # Backend Node.js (Express + Stripe)
├── public/
├── src/
│   ├── components/
│   └── pages/
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 💡 Aprendizados

Durante esse projeto, aprofundei conhecimentos em:

- 📦 Gerenciamento de estado global com Context + Reducer  
- 🌐 Comunicação entre frontend e backend  
- 🔐 Integração com serviços externos (Stripe)  
- ☁️ Deploy com Vercel e Render  
- 📄 Boas práticas de organização de código

---

## 🧠 Próximos Passos

- [ ] Adicionar filtro por categorias  
- [ ] Persistência do carrinho com localStorage  
- [ ] Cadastro e login de usuários  
- [ ] Melhorias visuais com animações

---

## 🙋‍♀️ Desenvolvido por

Feito com carinho por [Mariucha](https://github.com/vicmariucha) 💜  
Se quiser trocar uma ideia ou dar um feedback, é só me chamar! 😊
