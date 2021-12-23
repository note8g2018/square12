const crypto        = require('crypto');
const User      = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

const resetPassword = async (req, res, next)=>
{
    //const {username, email, password} = req.body;
    const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.resetToken).digest("hex");
    try 
    {
       const user = await User.findOne({
           resetPasswordToken: resetPasswordToken,
           resetPasswordExpire: {$gt: Date.now()},
       }); 
       if(!user)
       {
           return next(new ErrorResponse({
               message: "Invalid reset Token",
               statusCode: 400,
           }));
       }
       user.password = req.body.password;
       user.resetPasswordToken = undefined;
       user.resetPasswordExpire = undefined;
       await user.save();
       res.status(201).json({
           success: true,
           data: "Password Reset success",
       });
    } 
    catch (error) 
    {
        return next(error);
    }
}


module.exports = { resetPassword };