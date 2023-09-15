const express = require('express');
const User = require('../models/user-model');
const router = express.Router();
const path = require('path');

router.get('/', (req, res)=>{
    const htmlPath = path.join(__dirname, '..', 'views', 'index.html'); 
    res.sendFile(htmlPath);
})

router.post('/signup', async(req, res)=>{
   console.log("Data from client to server", req.body);
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            res.status(400).send("Email already registered");
        }
        else{
            
        const newUser = await User.create({name, email, password});
        res.redirect('/');

        }

    }
     catch(err){
         console.error("Signup failed", err);
         res.status(500).send("Signup failed"+err);
    }
})



module.exports = router;