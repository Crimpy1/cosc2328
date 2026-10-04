// HW5 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor

console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");
const book1 = {
    title: "Where the Wild Things Are",
    author: "Author 1",
    price: 10.99
}
const book2 = {
    title: "We're going on a bear hunt",
    author: "Author 2",
    price: 15.99
}
const book3 = {
    title: "The Very Hungry Caterpillar",
    author: "Author 3",
    price: 12.99
}

const TAX_RATE = 0.0825;
let isMember;

console.log("--- Book Inventory ---");
console.log("Title: ", book1.title);
console.log("Author: ", book1.author);
console.log("Price: $", book1.price.toFixed(2));

console.log("Title: ", book2.title);
console.log("Author: ", book2.author);
console.log("Price: $", book2.price.toFixed(2));

console.log("Title: ", book3.title);
console.log("Author: ", book3.author);
console.log("Price: $", book3.price.toFixed(2));

function calculateSubtotal(price, quantity) {
    return price * quantity;
}

function formatCurrency(amount) {
    return "$" + amount.toFixed(2);
}

console.log("--- Function Declarations Test ---");
console.log("calculateSubtotal(10.99, 2): ", calculateSubtotal(10.99, 2));
console.log("formatCurrency(10.99): ", formatCurrency(10.99));

const calculateTax = (subtotal) => subtotal * TAX_RATE;
const applyMemberDiscount = (subtotal, isMember) => { return isMember ? (subtotal - (subtotal * 0.9)) : subtotal; };

console.log("--- Arrow Functions Test ---");
console.log(calculateTax(10.99 * 2));
console.log(applyMemberDiscount(10.99 * 2, true));

const calculateTotal = function(price, quantity = 1, isMember = false) {
    const subtotal = calculateSubtotal(price, quantity);
    const discountedTotal = applyMemberDiscount(subtotal, isMember);
    const tax = calculateTax(discountedTotal); 
    return discountedTotal + tax;
}

console.log("--- Function Expression with Defaults ---");
console.log(calculateTotal(10.99, 2, true));
console.log(calculateTotal(10.99, 2));
console.log(calculateTotal(10.99));

function calculateBulkOrder(...prices) {
    let total = 0;
    for (const price of prices) {
        total += price;
    }
    return total;
}

console.log("--- Rest Operator Test ---");
console.log(calculateBulkOrder(book1.price, book2.price, book3.price));
console.log(calculateBulkOrder(book1.price, book2.price, book3.price, 11.99, 13.99));

function processOrder(book, quantity, callback) {
    return "Total: " + callback(book.price, quantity);
}

const memberPricing = (price, quantity) => ( price * quantity ) - ( price * quantity * 0.1);
const standardPricing = (price, quantity) => price * quantity;

console.log("--- Callback Functions ---");
console.log(processOrder(book1, 2, memberPricing));
console.log(processOrder(book1, 2, standardPricing));

const orderSummary = {
    customerName: "John",
    items : [],
    addItem(book, quantity) {
        this.items.push({book, quantity});
    },

    getTotal() {
        let total = 0;
        for (const item of this.items) {
            total += item.book.price * item.quantity;
        }
        return total;
    },

    displaySummary() {
        return "Customer: " + this.customerName 
        + "\nItems: " + this.items + "\nTotal: " 
        + this.getTotal();
    }
}
console.log("--- Object Methods ---");
orderSummary.addItem(book1, 3);
orderSummary.addItem(book2, 2);
console.log(orderSummary.displaySummary());

function validateDiscount(code) {
    if (code.toUpperCase() === "MEMBER10") {
        return 0.1;
    } else if (code.toUpperCase() === "SAVE20") {
        return 0.2;
    } else {
        return 0;
    }
}

console.log("--- Truthy/Falsy Validation ---")
console.log(validateDiscount("MEMBER10"));
console.log(validateDiscount("SAVE20"));
console.log(validateDiscount(""));
console.log(validateDiscount("INVALID"));

function createOrderProcessor(storeName) {
    function processStoreOrder(book, quantity) {
        return "Store name: " + storeName + "\nBook title: " + book.title + "Calculated Total: " + formatCurrency(calculateTotal(book.price, quantity));
    }
    return processStoreOrder;
}

console.log("--- Nested Functions & Closures ---")
const orderProcess = createOrderProcessor("My Bookstore");
console.log(orderProcess(book1, 2));
console.log(orderProcess(book2, 2));