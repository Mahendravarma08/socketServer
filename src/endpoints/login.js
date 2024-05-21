// loginController.js

const express = require('express');
const router = express.Router();
const User = require('../schemas/signup')
router.post('/login', async(req, res) => {
  const {userName,password} = req.body
  console.log(req.body,"reqq")
  const checkUser = await User.find({
    userName,
    password
  })
  console.log(checkUser,"CheckUser");
  if(checkUser.length){
    res.send({message:'Login Successful',ok:true,user:checkUser}); 
  }
  else
  res.status(401).send({message:'Invalid credentials',ok:false})

});


router.post('/signup',async(req,res)=>{
  try{
    console.log(req.body,"body_for_signup");
    const { userName, email, password } = req.body;
    const newUser = new User(req.body)
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser, ok :true });
  }
  catch(err){
    console.error(err)
    res.status(500).send('Error creating user');
  }
})


router.post('/getUsers',async(req,res)=>{
  try{
    console.log(req.body,"body_for_signup");
    const { userName } = req.body;
    const usersList = await User.find({userName:{$ne:userName}})
    console.log("usersList",usersList);
    res.json({message:'Users feched successfully.',users:usersList,ok:true})
  }
  catch(err){
    console.log(err);
    res.status(500).send("Failed fetching users list.")
  }
})

module.exports = [router];
