const express = require("express");
const {Tod , validateTodo} = require("../models/todos");
const {catchAsyncErrors , auth} = require("../middleware")
const router = express.Router();
const bcrypt = require("bcrypt");
//const _=require("lodash");
const { exist } = require("joi");
router.get("/",  auth, catchAsyncErrors(async (req, res, next) => {
    const todos = await Tod.find();
  
    const array = todos.map(ele =>{     
           const newTodos= {
               id: ele.id,
               name: ele.name,
               email: ele.email
           }
           return newTodos;
    })
 
     res.json(array);
}));
router.get("/:id", auth,catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const todos = await Tod.findById(id)
    if (!todos) return res.status(404).json({ message: "todo not found" })
    //res.json(todos);
    res.json({
        id: todos.id,
        name: todos.name,
        email: todos.email
    })
}));

router.delete("/:id", auth, catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    
    const todo = await Tod.findByIdAndDelete(id)
    if (!todo) return res.status(404).json({ message: "todo not found" })
    res.json({
        name : todo.name,
        email : todo.email,
        id : todo.id
    });
}));

router.put("/:id", auth, catchAsyncErrors(async (req, res) => {
    const { error } = validateTodo(req.body); 
    if (error) return res.status(400).json({message: error.details[0].message});
    
    const { id } = req.params;
    const { name , email , password} = req.body;
    const todo = await Tod.findById(id)
    if (!todo) return res.status(404).json({ message: "todo not found" })
    todo.name = name
    todo.email = email
    todo.password = password
    await todo.save();
    res.json({
        id: id,
        name: name,
        email: email
    });
}));

//register mynf3sh a2flha
router.post("/", catchAsyncErrors(async (req, res) => {
    const { error } = validateTodo(req.body); 
    if (error) return res.status(400).json({message: error.details[0].message}); //bdl maytl3 el error kolo bl original
    const tod = await Tod.findOne({ email: req.body.email })
    if (tod) return res.status(400).json({ message: "Todo already exist" });
    const password = await bcrypt.hash(req.body.password, 10)
    const newTod = new Tod({ ...req.body, password });
    await newTod.save();
    res.json({
        name : newTod.name,
        email : newTod.email,
        id : newTod.id
    });
}));

module.exports = router