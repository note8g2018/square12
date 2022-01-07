const User = require('../models/User');
const Info = require('../models/Info');
const sendToken = require('../utils/jwtToken');
const ErrorResponse = require('../utils/errorResponse');
const validator = require('../utils/validator');

const register = async (req, res, next) =>
{
    const { username, email, password } = req.body;
    if (!username || !email || !password)
    {
        const message = "Please provide a username, email and password";
        return next(new ErrorResponse({ message: message, statusCode: 400 }));
    }
    const isValid = validator.validateAll(username, email, password);
    if (!isValid)
    {
        const message = "Please provide a valid information";
        return next(new ErrorResponse({ message: message, statusCode: 401 }));
    }
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate)
    {
        const message = "This username is taken, sorry!!";
        return next(new ErrorResponse({ message: message, statusCode: 409 }));
    }

    let info = await Info.findOne();
    if (!info)
    {
        info = await Info.create({ idNumberUser: 0 });
    }
    const idNumber = ++info.idNumberUser;

    try 
    {
        // create and store new user
        const user = await User.create({
            username: username,
            email: email,
            password: password,
            idNumber: idNumber,
            ip: req.ip,
        });
        await info.save();
        return sendToken({ user: user, statusCode: 200, res: res });
    }
    catch (error) 
    {
        return next(error);
    }
};

module.exports = { register };