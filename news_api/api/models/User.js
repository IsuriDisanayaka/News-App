const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');


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
        unique: true,
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

userSchema.statics.login = async function (email, password) {

    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("Incorrect Email");
}


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