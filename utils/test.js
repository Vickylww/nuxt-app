// 这是一个测试函数，包含注释、长变量名、空格
export function calculateTotalPrice(items, discount) {
  const totalPrice = items.reduce((sum, item) => {
    console.log('计算商品:', item.name)
    return sum + item.price * item.quantity
  }, 0)

  const discountedPrice = totalPrice * (1 - discount)

  // 返回最终价格
  return discountedPrice
}

export const formatCurrency = (amount) => {
  return '¥' + amount.toFixed(2)
}
