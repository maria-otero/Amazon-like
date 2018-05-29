// Require mysql and require npm
var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require('cli-table');


// Create mysql DB
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // afterConnection();
    afterConnectionTable()
  });
  
// Display all of the items available for sale after connection
// function afterConnection() {
// connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
// });
// }


// Display all the products in a table
function afterConnectionTable() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.log("\nAll our available products:\n");
        console.log("-----------------------------------");
        for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    });
  }


// Promp the user what product he want, and how many of them
function userChoieProductInfo()

