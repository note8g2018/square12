const mongoose      = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        trim: true,
        type: String,
        required: true,
        indexes: true,
        unique: true,
        lowercase: true,
    },
    email:{
        trim: true,
        type: String,
        required: true,
        indexes: true,
        lowercase: true,
    },
    password:{
        trim: true,
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('User', userSchema)