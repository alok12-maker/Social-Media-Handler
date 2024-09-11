const express = require("express");
const app = express();
const mongoose = require('mongoose');

const upload = require('../models/multerConfig');
const User = require('../models/userModel');

const router = express.Router();



router.get("/" , async(req ,res)=>{
try{
const showAll = await User.find();
res.status(201).json(showAll);

}catch(error){
    console.log(error);
    res.status(401).json({error : error.message});
}
});


router.post('/' , upload.single('image') , async(req ,res)=>{
    const {name,email,age}= req.body;
    const image = req.file ? req.file.filename : null;
    console.log(`Image filename: ${image}`); 
   try{
    const userData = await User.create({
        name: name,
        email: email,
        age: age,
        image:image,
    });
    res.status(200).json(userData);
    } catch(error){
        console.log(error);
    res.status(400).json({error : error.message});
    }
})

//get single user

router.get("/:id" , async(req ,res)=>{

    const {id} = req.params;
    try{
    const singleUser = await User.findById({_id : id});
    res.status(201).json(singleUser);
    
    }catch(error){
        console.log(error);
        res.status(401).json({error : error.message});
    }
});

// delete 
router.delete("/:id" , async(req ,res)=>{

    const {id} = req.params;
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const deleteUser = await User.findByIdAndDelete({_id : id});
        res.status(201).json(deleteUser);
    
    }catch(error){
        console.log(error);
        res.status(401).json({error : error.message});
    }
});

//Update Put/Patch

router.patch("/:id" , async(req ,res)=>{

    const {id} = req.params;
    const {name, email, age} = req.body;
    try{
    const updateUser = await User.findByIdAndUpdate(id , req.body ,{new:true});
    res.status(201).json(updateUser);
    
    }catch(error){
        console.log(error);
        res.status(401).json({error : error.message});
    }
});


module.exports= router;
