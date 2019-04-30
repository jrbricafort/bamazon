var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Temple2010",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "begin",
      type: "list",
      message: "What would you like to do?",
      choices: ["BUY", "EXIT"]
    })
    .then(function (answer) {
      console.log(answer);
      if (answer.begin == "BUY") {
        buyProduct();
        showAll();
      } else {
        connection.end();
      }
    });
}

function showAll() {
  connection.query("SELECT * FROM products", function (err, results) {
    console.table(results)
  });
}

function buyProduct() {
  // query the database for all items being sold
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What would you like to buy?"
        },
        {
          name: "buy",
          type: "input",
          message: "How much would you like to buy?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // checks that there are enough items in stock, before updating db, letting the user know, and starting over
        if (answer.buy < parseInt(chosenItem.stock_quantity)) {
          var newQuantity = parseInt(chosenItem.stock_quantity - answer.buy)
          // console.log(newQuantity)
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Purchase successful! Enjoy your " + chosenItem.product_name + "! That will be $" + answer.buy * chosenItem.price + ".");
              start();
            }
          );
        }
        else {
          // give error if user wants more than what is available
          console.log("Sorry, we don't have enough items to fulfill your order. We only have " + chosenItem.stock_quantity + " " + chosenItem.product_name);
          start();
        }
      });
  });
}
