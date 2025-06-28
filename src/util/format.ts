export const { format: formatPriceWithType } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
})
export const { format: formatPriceWithoutType } = new Intl.NumberFormat(
  'pt-BR',
  {
    minimumFractionDigits: 2,
  },
)
