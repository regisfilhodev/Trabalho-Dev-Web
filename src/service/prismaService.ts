import { PrismaClient } from '@prisma/client'

// Instância global do Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Funções para interagir com o banco
export const prismaService = {
  // Produtos
  async getAllProducts() {
    try {
      return await prisma.product.findMany({
        orderBy: { createdAt: 'asc' }
      })
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      throw error
    }
  },

  async getProductById(id: string) {
    try {
      return await prisma.product.findUnique({
        where: { id }
      })
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
      throw error
    }
  },

  // Pedidos
  async createOrder(orderData: {
    destination: string
    payment: string
    total: number
    items: Array<{
      quantity: number
      value: number
      productId: string
    }>
  }) {
    try {
      return await prisma.order.create({
        data: {
          destination: orderData.destination,
          payment: orderData.payment,
          total: orderData.total,
          items: {
            create: orderData.items
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      throw error
    }
  },

  async getAllOrders() {
    try {
      return await prisma.order.findMany({
        include: {
          items: {
            include: {
              product: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
      throw error
    }
  },

  // Seed de produtos
  async seedProducts(products: any[]) {
    try {
      // Limpar produtos existentes
      await prisma.orderItem.deleteMany()
      await prisma.order.deleteMany()
      await prisma.product.deleteMany()

      // Inserir novos produtos
      const createdProducts = []
      for (const product of products) {
        const createdProduct = await prisma.product.create({
          data: product
        })
        createdProducts.push(createdProduct)
      }

      return createdProducts
    } catch (error) {
      console.error('Erro ao fazer seed dos produtos:', error)
      throw error
    }
  }
} 