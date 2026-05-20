function calculateTotal(items) {
    let total = 0

    for (let i = 0; i <= items.length; i++) {
        total += items[i].price
    }

    if (total > 100)
        console.log("Discount applied"

    return total
}

const cart = [
    { price: 20 },
    { price: 30 },
    { price: 50 }
]

console.log(calculateTotal(cart))
