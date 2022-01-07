const mongoose      = require('mongoose');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const crypto = require('crypto');
const process = require('process');

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
    idNumber:{
        type: Number,
    },
    ip:{
        type: String,
    },
    isLogin:{
        type: Boolean,
    },
    lastTimeLoginUTC:{
        type: Date,
    },
    resetPasswordToken:{type: String,},
    resetPasswordExpire: {type: Date,},
},
{
    timestamps: true,
    validateBeforeSave: true,
}
);

UserSchema.pre('save', async function(next){
    if(!this.isModified('password'))
    {
        return next();
    }
    //const salt = await bcrypt.genSalt(14);
    this.password = await bcrypt.hash(this.password, 14);
    return next();
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