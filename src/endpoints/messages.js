const express = require('express');
const router = express.Router();
const messages = require('../schemas/messages')

router.get('/messages/:currentUser/:selectedUser', async(req, res) => {
    console.log(req.params);
    const currentUser = req.params.currentUser
    const selectedUSer = req.params.selectedUser
    console.log(currentUser,"currentUSer");
    const message = await messages.find({
        sender:currentUser,
        recipient: selectedUSer
    }).sort({createdAt:-1})

    console.log(messages,"messagesss")
    if(messages?.length){
        res.send({message:'Fetching messages was successful',ok:true,messages:message}); 
      }
      else
      res.status(401).send({message:'Failed fetching messages',ok:false})
});


module.exports = [router];