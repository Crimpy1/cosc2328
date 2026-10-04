// IC11 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor

// Step 5 - Function declarations

console.log("--- Function Declarations ---");
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Maria"));
function area(width, height) {
    return width * height;
}

console.log("Area of 6 x 4: " + area(6, 4));

// Step 6 - Function expression + arrow functions
console.log("--- Function Expression + Arrow Functions ---");
const multiply = function (a,b) {return a * b};
const divide = (a,b) => {return a / b}; // explicit return
const square = n => n * n; // implicit return
console.log("Multiply(3,6): " + multiply(3, 6));
console.log("Divide(20, 5): " + divide(20, 5));
console.log("Square(7): " + square(7));

// Step 7 Deafult parameters + rest operator
console.log("--- Default parameters + Rest operator ---");
function greetUser(name, greeting = "Hello") { return greeting + ", " + name + "!"; }
console.log(greetUser("Sam")); // uses default
console.log(greetUser("Sam", "Yo")); // overrides default

function sumAll(...numbers) {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}

console.log("Sum all(1, 2, 3) = " + sumAll(1, 2, 3));

// Step 8 - callback functions
console.log("--- Callback Functions ---");

function processNumber(value, callback) {
    console.log("Processing: " + value + "...");
    return callback(value);
}

const double = n => n * 2;
const triple = n => n * 3;

console.log("double -> " + processNumber(5, double));
console.log("triple -> " + processNumber(5, triple));

// Step 9 - Object methods with this
console.log("--- Object Methods (this) ---");

const product = {
    brand: "iPhone 14",
    price: 999.99,
    quantity: 4,
    total () {
        return this.price * this.quantity;
    },
    describe() {
        return this.quantity + " x " + this.brand + " @ $" + this.price
        + " = $" + this.total().toFixed(2);
    }
}

console.log("Total: $" + product.total().toFixed(2));
console.log(product.describe());
