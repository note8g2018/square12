const User      = require('../models/User');
const sendToken = require('../utils/jwtToken');

const register = async (req, res, next)=>
{
    const {username, email, password} = req.body;

    try 
    {
        const user = await User.create({
            username,
            email,
            password,
        });
        return sendToken({user: user, statusCode: 200, res: res});
    } 
    catch (error) 
    {
        return next(error);        
    }
};


module.exports = { register };