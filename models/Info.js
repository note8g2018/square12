const mongoose      = require('mongoose');

const InfoSchema = new mongoose.Schema({
    idNumberUser:{
        trim: true,
        type: Number,
        required: [true,'Please provide a idNumberUser'],
        indexes: true,
        unique: true,
        default: 0,
    },
},
{
    timestamps: true,
}
);

// InfoSchema.pre('save', async function(next){
//     this.idNumberUser = ++this.idNumberUser;
//     return next();
// });

const Info = mongoose.model('Info', InfoSchema);
module.exports = Info;