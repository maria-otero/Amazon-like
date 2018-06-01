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
        // Grab stock_quantity number of chosen product id
        connection.query("SELECT * FROM products WHERE id = ?", [answer.chosenID], function(err, res) {
            if (err) {
                console.log("Sorry, we do not have that producto, chose one from the table.");
                showAllProducts();
            } else {
                //Update inventory
                var newInventory = res[0].stock_quantity - answer.chosenQuantity;
                // console.log(newInventory);
                connection.query("UPDATE products SET ? WHERE ?", [
                    {stock_quantity: newInventory}, 
                    {id: answer.chosenID}
                ]);

                // Show the price of the product
                var totalCost = (res[0].price) * (answer.chosenQuantity);
                // console.log(res.price);
                // console.log(res[0].price);
                console.log("\n****************************************************\n");
                console.log("Your ordeer has been placed! Your total is: $" + totalCost);

                console.log("Thank you for shopping with us!");
                console.log("\n****************************************************\n");

                keepShopping();
            }
        });
    })
}


//Promp the user if he whan to keep shopping: howAllProducts if yes; if no, connection ends
function keepShopping() {
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Would you like to keep shopping?"
        }
    ]).then(function(answer) {
        if (answer.confirm) {
            console.log("-----------------------------------------------------");
            showAllProducts();
        } else {
            console.log("\n****************************************************");
            console.log("Thank you for shopping Bamazon!");
            console.log("****************************************************\n");
            console.log();
            console.log();
            connection.end();
        }
    })
}
