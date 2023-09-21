const express = require("express");
const User = require("../models/user-model");
const Expense = require("../models/expense-model");
const routes = express.Router();
const path = require("path");
const bodyParser = require('body-parser');


routes.get('/userid/expenses', async (req, res)=>{
    try{
      const expenses = await Expense.findAll();
      console.log("Expenses",expenses)
      res.status(200).json(expenses);
    }catch(err){
      console.error('Error fetching expenses from database', err);
      res.status(500).json({error: 'Internal Server Error'});
    }
})

routes.post("/userid/expenseid", async (req, res) => {
  console.log("Expense Data from client to server", req.body);
  try {
          const { amount, description, field } = req.body;
          const newExpense = await Expense.create({ amount, description, field });
          console.log(newExpense);
          res.status(200).json({expense: newExpense}); //storing new expense in database
    }
     catch (err) {
    console.error("Unable to add expense to database", err);
    res.status(500).send("Unable to add expense to database" + err);
  }
});


routes.delete("/expense/delete/:id", async (req, res) => {
    console.log("Expense Data to delete from client to server", req.body);
    try {
            const uid = req.params.id;
            const deleteExpense = await Expense.findByPk(uid);
            if(deleteExpense) {
              await deleteExpense.destroy();
             res.status(204).json({ success: true,message:"delete successfully"})
            }

            else throw new Error('ERROR TO DELETE');
        }
       catch (err) {
      console.error("Unable to delete expense to database", err);
      res.status(500).send("Unable to delete expense to database" + err);
    }
  });





module.exports = routes;



//USER ROUTE
const express = require("express");
const User = require("../models/user-model");
const expenseRouter = require("./expense-route")
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


router.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "..", "views", "index.html");
  res.sendFile(htmlPath);
});



router.post("/signup", async (req, res) => {
  console.log("Signup Data from client to server", req.body);
  try {
    const { name, email, password } = req.body;
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      if (err) throw new Error("Something wrong while hashing password");
      else {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          res.status(400).send("Email already registered");
        } else {
          const newUser = await User.create({ name, email, password: hash });
          res.redirect("/");
        }
      }
    });
  } catch (err) {
    console.error("Signup failed", err);
    res.status(500).send("Signup failed" + err);
  }
});




router.post("/signin", async (req, res) => {
  console.log("Signin Data from client to server", req.body);
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      //convert password to hash and compare
      bcrypt.compare(password, existingUser.password, async (err, result) => {
        if (err)
          throw new Error("Trouble matching input password and stored hash");
        else {
          if (result === true){
            console.log("User Login Successful!");
            res.status(200).json({success: true, message: "User logged in successfully", user: existingUser});
          }
          else res.status(400).send("Incorrect Password");
        }
      });
    } else res.status(404).send("User not found");
  } catch (err) {
    console.error("Signin failed", err);
    res.status(500).send("Signin failed" + err);
  }
});


function generateToken(id, name, secretKey){
  const token =  jwt.sign({userid:id, username:name}, secretKey);
  return token;
}

module.exports = router;
