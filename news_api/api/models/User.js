const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    verificationToken: { 
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
    },
    reEnterPassword: {
        type: String,
    },
    role: {
        type: Number,
    }

});
const User = mongoose.model('User', userSchema);
const userValidationSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    reEnterpassword: Joi.string().min(8).required(),


});
module.exports = {
    User,
    userValidationSchema
};