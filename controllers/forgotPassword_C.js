const User      = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

const forgotPassword = async (req, res, next)=>
{
    const {username} = req.body;
    try 
    {
        const user = await User.findOne({username});
        if(!user)
        {
            const message = "This username is wrong";
            return next(new ErrorResponse({message:message, statusCode:404}));
        }
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const restURL = `${process.env.ResetURL}/${resetToken}`;
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${restURL} clicktracking=off>${restURL}</a>
        `;
        try 
        {       
            await sendEmail({
                to: user.email,
                subject: "Password Reset",
                text: message,
            });
            return res.status(200).json({
                success: true,
                data: "Email sent",
            });     
        }
        catch (error) 
        {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse({
                message: "Email could not be sent",
                statusCode: 500,
            }));            
        }
    } 
    catch (error) 
    {
        return next(error);
    }
}


module.exports = { forgotPassword };