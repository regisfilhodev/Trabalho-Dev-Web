import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Listar todos os cafés
app.get('/api/coffees', async (req, res) => {
  try {
    const coffees = await prisma.product.findMany({ orderBy: { createdAt: 'asc' } });
    res.json({ coffees });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cafés' });
  }
});

// Buscar café por ID
app.get('/api/coffees/:id', async (req, res) => {
  try {
    const coffee = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!coffee) return res.status(404).json({ error: 'Café não encontrado' });
    res.json({ coffee });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar café' });
  }
});

// Criar novo pedido
app.post('/api/orders', async (req, res) => {
  try {
    const { destination, payment, total, items } = req.body;
    const order = await prisma.order.create({
      data: {
        destination: typeof destination === 'string' ? destination : JSON.stringify(destination),
        payment,
        total,
        items: { create: items },
      },
      include: { items: { include: { product: true } } },
    });
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

// Listar todos os pedidos
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor API rodando em http://localhost:${PORT}`);
  console.log('📝 Endpoints disponíveis:');
  console.log('   GET  /api/coffees - Listar todos os cafés');
  console.log('   GET  /api/coffees/:id - Buscar café por ID');
  console.log('   POST /api/orders - Registrar novo pedido');
  console.log('   GET  /api/orders - Listar todos os pedidos');
}); 