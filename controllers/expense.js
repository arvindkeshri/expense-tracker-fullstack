const express = require('express');
const User = require("../models/user-model");
const Expense = require("../models/expense-model");
const routes = express.Router();
const path = require("path");
const bodyParser = require('body-parser');


const addExpense = async (req, res) => {
    console.log("Expense Data from client to server", req.body);
    try {
            //console.log(req.user);
            const { amount, description, field } = req.body;
            const userId = req.user.id;
            const newExpense = await req.user.createExpense({ amount, description, field});
            const total = Number(req.user.total)+Number(newExpense.amount);
            console.log("newExpense created in controller>>>>", newExpense, total);
            await User.update({total:total}, {where: {id:userId}})
            return res.status(200).json({expense: newExpense}); //storing new expense in database
      }
       catch (err) {
      console.error("Unable to add expense to database", err);
      res.status(500).send("Unable to add expense to database" + err);
    }
  }



const getExpenses = async (req, res)=>{
    try{
        const expenses = await  req.user.getExpenses()
        return res.status(200).json({expenses}); 
    }catch(err){
      console.error('Error fetching expenses from database', err);
      res.status(500).json({error: 'Internal Server Error'});
    }
}



const deleteExpense = async (req, res) => {
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
  }

  module.exports = {
    addExpense,
    getExpenses,
    deleteExpense
  }



















// routes.get('/userid/expenses', async (req, res)=>{
//     try{
//       const expenses = await Expense.findAll();
//       console.log("Expenses",expenses)
//       res.status(200).json(expenses);
//     }catch(err){
//       console.error('Error fetching expenses from database', err);
//       res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// routes.post("/userid/expenseid", async (req, res) => {
//   console.log("Expense Data from client to server", req.body);
//   try {
//           const { amount, description, field } = req.body;
//           const newExpense = await Expense.create({ amount, description, field });
//           console.log(newExpense);
//           res.status(200).json({expense: newExpense}); //storing new expense in database
//     }
//      catch (err) {
//     console.error("Unable to add expense to database", err);
//     res.status(500).send("Unable to add expense to database" + err);
//   }
// });


// routes.delete("/expense/delete/:id", async (req, res) => {
//     console.log("Expense Data to delete from client to server", req.body);
//     try {
//             const uid = req.params.id;
//             const deleteExpense = await Expense.findByPk(uid);
//             if(deleteExpense) {
//               await deleteExpense.destroy();
//              res.status(204).json({ success: true,message:"delete successfully"})
//             }

//             else throw new Error('ERROR TO DELETE');
//         }
//        catch (err) {
//       console.error("Unable to delete expense to database", err);
//       res.status(500).send("Unable to delete expense to database" + err);
//     }
//   });





// module.exports = routes;
