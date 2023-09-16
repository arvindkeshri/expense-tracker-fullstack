const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const userRouter = require('./routes/user-route')
const sequelize =  require('./util/sequelize');
const User = require ('./models/user-model');

app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(bodyParser.json());


app.use(express.static('images'));
app.use(express.static('views'));
// app.use(express.static(path.join(__dirname,'images')));
// app.use(express.static(path.join(__dirname,'views')));

sequelize.sync().then(result=>{
    console.log(result);
}) 
.catch((err)=>{
    console.log(err);
})

app.use('/', userRouter);

app.listen((3000), ()=>{
    console.log("Server running ok")
});
