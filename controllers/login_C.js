const User      = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendToken = require('../utils/jwtToken');

const login = async (req, res, next)=>
{
    const {username, password} = req.body;
    if(!username || !password)
    {
        const message = "Please provide a username and password";
        return next(new ErrorResponse({message:message, statusCode:400}));
    }

    try 
    {
        const user = await User.findOne({username}).select("+password");
        console.log(user);
        if(!user)
        {
            const message = "The username or password or both are not correct";
            return next(new ErrorResponse({message:message, statusCode:401}));
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch)
        {
            const message = "The username or password or both are not correct";
            return next(new ErrorResponse({message:message, statusCode:401})); 
        }
        return sendToken({user: user, statusCode: 201, res: res});
    } 
    catch (error) 
    {
        return next(error);
    }
}




module.exports = { login };