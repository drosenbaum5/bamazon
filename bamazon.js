var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");
// var columns = columnify(data, options)
// console.log(columns)

var productsList = "SELECT * FROM products ";

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



connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
 
});


//Select products from table to display in JSON format
function afterConnection() {
  connection.query(productsList, function(err, response) {
    if (err) throw err;
    var columns = columnify(response , {
      columnSplitter: ' | ',
      paddingChr: ' . ',
    })
    console.log(columns);
    connection.end();
  });
}



//Create User Prompt to allow item selection
// inquirer
// .prompt([
//   {
//     type: "input",
//     name: "",
//     message:"Please select the ID of the product",
//     choices: [""]
//   },

//   {
//     type: "input",
//     name: "",
//     message: "",
//     choices: [""]
//   }
// ])
