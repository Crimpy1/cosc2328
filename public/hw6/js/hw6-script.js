// HW6 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor

const productPrices = {
    laptop : 999.99,
    tablet : 499.99,
    phone : 699.99,
    monitor : 299.99
}

const discountCodes = {
    SAVE10 : .10,
    SAVE20 : .20,
    STUDENT : .15
}

calculateTax = (subtotal) => {
    return subtotal * 0.0825;
}

const applyDiscount = (subtotal, code) => {
    code = (code).toUpperCase().trim();

    if ((discountCodes[code]) == .10) {
        return discountCodes[code] * subtotal;
    } else if ((discountCodes[code]) == .20) {
        return discountCodes[code] * subtotal;
    } else if ((discountCodes[code]) == .15) {
        return discountCodes[code] * subtotal;
    } else {
        return 0;
    }
};

const orderForm = document.getElementById("orderForm");
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const discountCode = document.getElementById("discountCode");
const results = document.getElementById("results");

orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedProduct = product.value;
    const qty = parseInt(quantity.value);
    const discountCodeValue = discountCode.value.trim();

    if (!(productPrices[selectedProduct])){
        alert("Invalid product selection.");
        return 0;
    } else if (qty < 1) {
        alert("product quantity less than 2");
        return 0;
    }
    const subtotal = productPrices[selectedProduct] * qty;
    const discountAmount =  applyDiscount(subtotal, discountCodeValue);
    const discountedSubtotal = subtotal - discountAmount; 
    const tax = calculateTax(discountedSubtotal);
    const total = (discountedSubtotal + tax);
    results.textContent = "Quantity: " + qty + "\n"
                        + "Subtotal: $" + subtotal.toFixed(2) + "\n"
                        + "Discount Amount: -$" + discountAmount.toFixed(2) + "\n"
                        + "Discounted Subtotal: $" + discountedSubtotal.toFixed(2) + "\n"
                        + "Tax: $" + tax.toFixed(2) + "\n"
                        + "Total: $" + total.toFixed(2);
    
    results.classList.remove("results-hidden");
});
