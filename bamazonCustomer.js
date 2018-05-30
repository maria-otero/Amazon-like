// Require mysql and require npm
var mysql = require("mysql");
var inquirer = require("inquirer");

// Connection to mysql DB
var connection = mysql.createConnection({
    host: "localhost",
    // Port
    port: 3306,
    // Username
    user: "root",
    // Password
    password: "",
    database: "bamazon_DB"
});


connection.connect(function(err) {
    if (err) throw err;
    // Display all the products in a table
    showAllProducts();
});  



// Show all products into a table
function showAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.log("\nAll our available products:");
        console.log("-----------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(" Item ID: " + res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$ " + res[i].price.toString() + " | " + res[i].stock_quantity.toString() + " UNITS");
        }
        console.log("------------------------------------------------------\n");
        buyItem();
    });
}



// Promp the user what product he want, and how many of them
function buyItem() {
    inquirer.prompt([
        {
            name: "chosenID",
            type: "input",
            message: "What is de Item ID of the product you would like to buy?",
            filter: Number
        }, {
            name: "chosenQuantity",
            type: "input",
            message: "How many units of this product would you like to buy?",
            filter: Number
        } 
    ]).then(function(answer) {
        // Updating inventory
        var updateInventory = "UPDATE products SET stock_quantity = " + (stock_quantity - answer.chosenQuantity) + "WHERE id = " + answer.chosenID;

        connection.query(updateInventory, function(err, data) {
            if (err) throw err;

            // Show the price of the product... how can I grab de price of the chocen ID from the table??????
            console.log("Your ordeer has been placed! Your total is" + productID.price * answer.chosenQuantity);

            console.log("Thank you for shopping with us!");
            console.log("-----------------------------------------------------\n");

            keepShopping();

        }); 
    })
}




// Promp the user if he whan to keep shopping
// showAllProducts if yes; if no, connection ends
function keepShopping() {
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Would you like to keep shopping?"
        }
    ]).then(function(ranswer) {
        if (answer.confirm) {
            console.log("-----------------------------------------------------");
            showAllProducts();
        } else {
            console.log("Thank you for shopping Bamazon!");
            connection.end();
        }
    })
}



// connection.query("SELECT * FROM products WHERE ?", 
// { id: answer.chosenID}, function(err, res) {
//     if (err) throw err;
    
//     // Response if product exist
//     if (answer.chosenID === productID) {
//         console.log("We are proccesing your order!");
//     } else {
//         console.log("Plsease choce an ID that exist.");
//     }
//     // Response if there are enough stock
//     if (answer.chosenQuantity <= productStock) {
//         console.log("Your product is in stock... placing your order!");
//     } else {
//         console.log("Sorry, item's not in stock to place your order.\n" + 
//         "Please change your order.\n");
//         keepShopping();
//     }
