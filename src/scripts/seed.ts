import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('🔍 Verificando banco de dados...')
    
    // Verificar se há produtos no banco
    const products = await prisma.product.findMany()
    
    if (products.length > 0) {
      console.log(`✅ Banco configurado! ${products.length} produtos encontrados:`)
      products.forEach(product => {
        console.log(`   - ${product.name} (R$ ${product.value})`)
      })
    } else {
      console.log('⚠️  Nenhum produto encontrado no banco.')
      console.log('💡 Execute o comando de seed se necessário.')
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar banco:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase() 