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

// Promp the user what product he want, and how many of them
function productInfo() {
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What is de Item ID of the product you would like to buy?",
        }, {
            name: "quantity",
            type: "input",
            message: "How many units of this product would you like to buy?",
        }
    ]).then(function(res) {
        var idChosen = parseInt(res.product);
        var quantityChosen =  parseInt(res.quantity);
        

        connection.query("SELECT * FROM products WHERE id = " + idChosen,
            function(err, response) {
                if (err) throw err;

                if (response.length === 0) {
                    console.log("\nERROR: Select a valid Item ID from Products list.");
                    showAllProducts();
                } else {
                    // Response if the quentity resquested by the user is in stock
                    var productRes = response[0];
                    if (quantityChosen <= productRes.stock_quantity) {
                        console.log("Your product is in stock... placing your order!");

                        // Updating inventory
                        var updateInventory = "UPDATE products SET stock_quantity = " + (productRes.stock_quantity - quantityChosen) + "WHERE id = " + idChosen;

                        connection.query(updateInventory, function(err, data) {
                            if (err) throw err;

                            console.log("Your ordeer has been placed! Your total is" + productRes.price * quantityChosen);
                            console.log("Thank you for shopping with us!");
                            console.log("-----------------------------------------------------\n");
                            keepShopping();
                        })
                    } else {
                        console.log("Sorry, item's not in stock to place your order.\n" + 
                            "Please change your order.\n" + 
                            "Your item was " + productRes.product_name + " left in stock.");
                        keepShopping();

                    }
                }
            })
        })
}

    
    
// Show all products into a table
function showAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.log("\nAll our available products:");
        console.log("-----------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(" Item ID: " + res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$ " + res[i].price.toString() + " | " + res[i].stock_quantity.toString() + " UNITS");
        }
        console.log("------------------------------------------------------\n");
        productInfo();
    });
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
    ]).then(function(res) {
        if (res.confirm) {
            console.log("-----------------------------------------------------");
            showAllProducts();
        } else {
            console.log("Thank you for shopping Bamazon!");
            connection.end();
        }
    })
}
