// IC10 – COSC 2328 – Professor McCurry
//     Implemented by: Gigi Kahlor

// Step 5 - variables and concatenation

const city = "Austin";
const country = "USA";
let population = 1;

console.log("Location: " + city + ", " + country);
console.log("Population: " + population);

if (population > 1000000) {
    console.log(city + " is a metropolis.");
} else {
    console.log(city + " is a growing city.");
}

let isLoggedin = false;

if (isLoggedin) {
    console.log("Welcome back!");
} else {
    console.log("Please log in.");
}

let username = "";

if (username) {
    console.log("Username accepted: " + username);
} else {
    console.log("Username is required.");
}

let hasAccount  = true;
let isEmailVerified = false;
let agreedToTerms = true;

if ((hasAccount && isEmailVerified) || agreedToTerms) {
    console.log("Registration allowed");
} else {
    console.log("Registration blocked");
}