const mongoose = require("mongoose");
const Joi = require("joi");
const { boolean } = require("joi");

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
   
});

const Tod = mongoose.model("Tod", TodoSchema);
const validationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(50).required()
});

const validateTodo = (todo) => {
    return validationSchema.validate(todo)
}


module.exports = {Tod , validateTodo};