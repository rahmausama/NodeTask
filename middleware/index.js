const jwt = require("jsonwebtoken");
const logger = (req, res, next) => {
    console.log(req.method, req.url);
    // res.json({ res: "Response from the middleware" })
    next();
}

//DUMMY
const auth = (req, res, next) => {
     try {
         const tod = jwt.verify(req.header("x-auth-token"), process.env.JWT_SECRET);
         req.tod = tod;//elm3lumat l gaya mn l token b7otha 3la l request
         next()
        } catch(error){
            res.status(404).json({ message: "un-authorized" })
        }
}
const catchAsyncErrors=(handler)=>{
    return async(req,res,next)=>{
        try{
            await handler(req,res,next);
        } catch(error){
            next(error)
        }
    }
}

module.exports = { logger, auth, catchAsyncErrors }