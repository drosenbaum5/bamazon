//required packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");

//global variables
var productsList = "SELECT * FROM products ";
var stockCount = 0;
var purchaseCount = 0;
var purchaseID = 0;

//Create a connection to the database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Hello",
  database: "bamazon_db"
});


//Show connection in log if successful. Throw error if not.
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();


});


//Select products from table to grab JSON response and format in columns
function afterConnection() {
  connection.query(productsList, function (err, response) {
    if (err) throw err;
    var columns = columnify(response, {
      columnSplitter: ' | ',
      paddingChr: '  ',
    })
    // console.log(response)
    console.log(columns);
    selectItems();
    // connection.end();
  });
}


//Function to create User Prompt to allow item selection
function selectItems() {

  inquirer
    .prompt([
      {
        type: "input",
        name: "productID",
        message: "Please select the ID of the product: ",

      },

      {
        type: "input",
        name: "productAmount",
        message: "Please select the amount to purchase: ",

      }
    ]).then(function (productChoice) {

      purchaseCount = productChoice.productAmount;
      purchaseID = productChoice.productID;

      
      console.log("Product ID: " + productChoice.productID);
      console.log("Product Amount: " + productChoice.productAmount);
      updateProductAmount();

    })
}

    //Function to update product amount
    function updateProductAmount () {
      connection.query("Select * FROM products WHERE id = ?", purchaseID, function(err,response){
      var updateQuantity = response[0].stock_quantity - purchaseCount;

      connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?",
      [updateQuantity, purchaseID], function (err, response) {
        if (err) throw err;
        // console.log(response);
        showTotal();
       })

    })
    }

    //Function for grabbing item total and multiplying it by number of items
    function showTotal () {
     connection.query("Select * FROM products WHERE id = ?", purchaseID, function (err,response){
      console.log("You purchased " + purchaseCount + " " + response[0].product_name)
      console.log("Your Total is: $" + response[0].price * purchaseCount);
      connection.end();
    
    })
      
    }