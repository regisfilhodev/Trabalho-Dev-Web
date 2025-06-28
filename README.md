# ☕ Coffee Delivery

Um projeto full-stack de delivery de café desenvolvido com React, TypeScript, Express, Prisma ORM e PostgreSQL (Neon).

## 🚀 Tecnologias

- **Frontend**: React, TypeScript, Vite, Styled Components
- **Backend**: Express.js, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Formulários**: React Hook Form + Zod
- **Roteamento**: React Router DOM

## 📋 Pré-requisitos

- Node.js 18+
- Conta no [Neon](https://neon.tech) (banco PostgreSQL)

## 🛠️ Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd coffee-delivery
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados

1. Crie uma conta no [Neon](https://neon.tech)
2. Crie um novo projeto PostgreSQL
3. Copie a URL de conexão fornecida
4. Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://seu_usuario:sua_senha@seu_host/database_name?sslmode=require"
```

### 4. Configure o banco

```bash
# Gerar o cliente Prisma
npm run db:generate

# Executar as migrações
npm run db:migrate

# Verificar se o banco está configurado
npm run db:check
```

### 5. Execute o projeto

**Para desenvolvimento, você precisa rodar o backend e frontend separadamente:**

```bash
# Terminal 1 - Backend API
npm run api

# Terminal 2 - Frontend
npm run dev
```

**Ou use o script combinado (se configurado):**
```bash
npm run dev:full
```

## 📁 Estrutura do Projeto

```
coffee-delivery/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   ├── context/            # Context API (carrinho)
│   ├── hooks/              # Custom hooks
│   ├── service/            # Serviços (API e Prisma)
│   ├── styles/             # Estilos globais
│   ├── @types/             # Tipos TypeScript
│   └── scripts/            # Scripts (seed)
├── prisma/                 # Schema e migrações
├── server-api.js           # Servidor Express (backend)
└── public/                 # Assets estáticos
```

## 🎯 Funcionalidades

- ✅ **Catálogo de cafés** com imagens e descrições
- ✅ **Carrinho de compras** com localStorage
- ✅ **Formulário de endereço** com validação
- ✅ **Seleção de método de pagamento**
- ✅ **Confirmação de pedido** com dados de entrega
- ✅ **Proteção de rotas** (carrinho vazio)
- ✅ **Interface responsiva** e moderna
- ✅ **API REST** com Express.js
- ✅ **Integração com banco PostgreSQL** via Prisma

## 🗄️ Banco de Dados

O projeto usa **Prisma ORM** com **PostgreSQL (Neon)**:

### Modelos:
- **Product**: Cafés disponíveis
- **Order**: Pedidos realizados
- **OrderItem**: Itens de cada pedido

### Comandos úteis:
```bash
# Visualizar dados no Prisma Studio
npm run db:studio

# Verificar status do banco
npm run db:check

# Executar migrações
npm run db:migrate
```

## 🔌 API Endpoints

O backend Express expõe os seguintes endpoints:

- `GET /api/coffees` - Listar todos os cafés
- `GET /api/coffees/:id` - Buscar café por ID
- `POST /api/orders` - Criar novo pedido
- `GET /api/orders` - Listar todos os pedidos

## 🎨 Interface

- **Design moderno** com gradientes e sombras
- **Animações suaves** e feedback visual
- **Responsivo** para mobile e desktop
- **Tema escuro** com cores de café

## 📱 Páginas

1. **Home** (`/`): Catálogo de cafés
2. **Pagamento** (`/payment`): Formulário de entrega
3. **Confirmação** (`/purchase-completed`): Pedido confirmado

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento (frontend)
- `npm run api` - Servidor backend (Express)
- `npm run build` - Build para produção
- `npm run db:generate` - Gerar cliente Prisma
- `npm run db:migrate` - Executar migrações
- `npm run db:check` - Verificar status do banco
- `npm run db:studio` - Abrir Prisma Studio

## 🚀 Deploy

### Para produção, você precisa:

1. **Deploy do Backend**: Hospedar o `server-api.js` em Vercel, Render, Railway, etc.
2. **Deploy do Frontend**: Hospedar o build do React em Vercel, Netlify, etc.
3. **Configurar URLs**: Atualizar a URL da API no frontend para apontar para o backend em produção

### Variáveis de ambiente necessárias:
- `DATABASE_URL`: URL do banco PostgreSQL (Neon)

## 👨‍💻 Desenvolvido por

**Seu Nome** - Desenvolvedor Full Stack

---

⭐ Se este projeto te ajudou, deixe uma estrela!
