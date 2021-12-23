const mongoose      = require('mongoose');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const crypto        = require('crypto');

//const composeDB = require('../config/db');

//const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username:{
        trim: true,
        type: String,
        required: [true,'Please provide a username'],
        indexes: true,
        unique: true,
        lowercase: true,
    },
    email:{
        trim: true,
        type: String,
        required: [true,'Please provide an email'],
        indexes: true,
        lowercase: true,
    },
    password:{
        trim: true,
        type: String,
        required: [true,'Please provide a password'],
        minlength: 8,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

UserSchema.pre('save', async function(next){
    if(!this.isModified('password'))
    {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(password)
{
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function()
{
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE});
};

UserSchema.methods.getResetPasswordToken = function()
{
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 1000 * 60 * 10;
    return resetToken;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;