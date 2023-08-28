const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get(`/`, async (req, res) =>{
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})


router.post('/',async(req,res)=>{  
        let user = new User({

            name: req.body.name,
            email: req.body.email,
            color:req.body.color,
            passwordHash: bcrypt.hashSync(req.body.passwordHash,10),
            phone:req.body.phone,
            isAdmin: req.body.isAdmin,
            appartment: req.body.appartment,
            zip: req.body.zip,
           city: req.body.city,
           country: req.body.country,




        })
    user = await user.save();
    if(!user){
    return res.status(404).send('the user cannot be created!')
    }
        res.send(user);
})

router.get(`/`, async (req,res)=>{
    const usersList = await User.find().select('name phone emai');
    if(!usersList){
        res.status(500).json({success: false});
    }
    res.send(usersList) ;
})

router.get(`/:id`, async (req,res)=>{
    const usersList = await User.findById(req.params.id).select('-paswordHash');
    if(!usersList){
        res.status(500).json({success: false});
    }
    res.send(usersList) ;
})

module.exports =router;