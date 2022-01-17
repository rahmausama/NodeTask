const express = require("express");
const router = express.Router();
const {Tod} = require("../models/todos");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validate =(auth)=>{
   const schema = Joi.object({
       email:Joi.string().email().required(),
       password:Joi.string().required()

   })
   return schema.validate(auth)
}


router.post("/", async (req , res)=>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).json({message: error.details[0].message});
    const tod = await Tod.findOne({ email: req.body.email }) //kda et2kdt mn l mail fadel pass
    if (!tod) return res.status(401).json({ message: "email or password is incorrect" });
    
    const isvalidpassword = await bcrypt.compare(req.body.password , tod.password)
    if (!isvalidpassword) return res.status(401).json({ message: "email or password is incorrect" });

    const token = jwt.sign({ id: tod.id , isAdmin: tod.isAdmin}, process.env.JWT_SECRET)
    res.json({ token })
    //res.json(true)
});

module.exports=router