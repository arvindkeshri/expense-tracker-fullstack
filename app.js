const express = require('express');
const app = express();
require('dotenv').config();

//import and middlewares
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(bodyParser.json());

//use static files 
app.use(express.static('images'));
//app.use(express.static('views'));
app.use(express.static(path.join(__dirname, "views")));


//import models and database
const User = require ('./models/user-model');
const Order = require('./models/order-model')
const Expense = require('./models/expense-model');
const sequelize =  require('./util/sequelize');

//import routes
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expenses');
const purchaseRouter = require('./routes/purchase');
const premiumRouter = require('./routes/premium');
const passwordRouter = require('./routes/password');

//any model relations
User.hasMany(Expense);
Expense.belongsTo(User); //add cascade
User.hasMany(Order);
Order.belongsTo(User);


//route directs
app.use('/', userRouter);
app.use('/expense',expenseRouter);
app.use('/purchase',purchaseRouter);
app.use('/premium', premiumRouter)
// app.use('/password', passwordRouter)

app.use((req, res)=>{
    res.sendFile(path.join(__dirname,`/views/${req.url}`));
})


sequelize.sync()
.then(result=>{
    app.listen(3000, ()=>{
            console.log("Server running");
    })
}) 
.catch((err)=>{
    console.log("Database Error setting Sequelize",err);
})


















