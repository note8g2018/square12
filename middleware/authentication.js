const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

const protect = async (req, res, next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token)
    {
        const message = "Not authorized to access this route";
        return next(new ErrorResponse({message: message, statusCode: 401}));
    }
    try 
    {
        const decoded = jwt.verify(token,
             process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user)
        {
            const message = "No user found with this id";
            return next(new ErrorResponse({message: message, statusCode: 404}));
        }
        req.user = user;
        return next();
    } 
    catch (error) 
    {
        
        const message = "Not authorized to access this route";
        return next(new ErrorResponse({message: message, statusCode: 401}));
    }
}

module.exports = protect;