import { prismaService, prisma } from '../service/prismaService'

async function checkDatabase() {
  try {
    console.log('🔍 Verificando dados no banco Neon...')
    
    const products = await prismaService.getAllProducts()
    
    if (products.length === 0) {
      console.log('📝 Banco vazio, fazendo seed dos cafés...')
      
      // Dados dos cafés
      const coffees = [
        {
          name: "Expresso Tradicional",
          description: "O tradicional café feito com água quente e grãos moídos",
          coffee_image: "expresso",
          tags: ["TRADICIONAL"],
          value: 9.90
        },
        {
          name: "Expresso Americano",
          description: "Expresso diluído, menos intenso que o tradicional",
          coffee_image: "americano",
          tags: ["TRADICIONAL"],
          value: 9.90
        },
        {
          name: "Expresso Cremoso",
          description: "Café expresso tradicional com espuma cremosa",
          coffee_image: "expresso-cremoso",
          tags: ["TRADICIONAL"],
          value: 9.90
        },
        {
          name: "Café Gelado",
          description: "Bebida preparada com café expresso e cubos de gelo",
          coffee_image: "cafe-gelado",
          tags: ["TRADICIONAL", "GELADO"],
          value: 9.90
        },
        {
          name: "Café com Leite",
          description: "Meio a meio de expresso tradicional com leite vaporizado",
          coffee_image: "cafe-com-leite",
          tags: ["TRADICIONAL", "COM LEITE"],
          value: 9.90
        },
        {
          name: "Latte",
          description: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
          coffee_image: "latte",
          tags: ["TRADICIONAL", "COM LEITE"],
          value: 9.90
        },
        {
          name: "Capuccino",
          description: "Bebida com canela feita de doses iguais de café, leite e espuma",
          coffee_image: "capuccino",
          tags: ["TRADICIONAL", "COM LEITE"],
          value: 9.90
        },
        {
          name: "Macchiato",
          description: "Café expresso misturado com um pouco de leite quente e espuma",
          coffee_image: "macchiato",
          tags: ["TRADICIONAL", "COM LEITE"],
          value: 9.90
        },
        {
          name: "Mocaccino",
          description: "Café expresso com calda de chocolate, pouco leite e espuma",
          coffee_image: "mocaccino",
          tags: ["TRADICIONAL", "COM LEITE"],
          value: 9.90
        },
        {
          name: "Chocolate Quente",
          description: "Bebida feita com chocolate dissolvido no leite quente e café",
          coffee_image: "chocolate-quente",
          tags: ["ESPECIAL", "COM LEITE"],
          value: 9.90
        },
        {
          name: "Cubano",
          description: "Drink gelado de café expresso com rum, creme de leite e hortelã",
          coffee_image: "cubano",
          tags: ["ESPECIAL", "ALCOÓLICO", "GELADO"],
          value: 9.90
        },
        {
          name: "Havaiano",
          description: "Bebida adocicada preparada com café e leite de coco",
          coffee_image: "havaiano",
          tags: ["ESPECIAL"],
          value: 9.90
        },
        {
          name: "Árabe",
          description: "Bebida preparada com grãos de café árabe e especiarias",
          coffee_image: "arabe",
          tags: ["ESPECIAL"],
          value: 9.90
        },
        {
          name: "Irlandês",
          description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
          coffee_image: "irlandes",
          tags: ["ESPECIAL", "ALCOÓLICO"],
          value: 9.90
        }
      ];
      
      await prismaService.seedProducts(coffees)
      console.log('✅ Seed concluído com sucesso!')
    } else {
      console.log(`✅ Banco já possui ${products.length} cafés`)
      console.log('📋 Cafés disponíveis:')
      products.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name} - R$ ${product.value}`)
      })
    }
    
    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Erro ao verificar banco:', error)
    process.exit(1)
  }
}

checkDatabase() 