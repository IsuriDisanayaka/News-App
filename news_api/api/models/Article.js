const mongoose = require('mongoose');
const Joi = require('joi');

const articleSchema = new mongoose.Schema({
    articleId: {
        type: Number,
        unique: true,
    },
    articleTitle: {
        type: String,
    },
    articleDescription: {
        type: String,
    },
    articleBody: {
        type: String,
    },
    image: {
        type: String,
    },
    createdDate: {
        type: Date,
    },
    authorName: {
        type: String,
    },



});
const Article = mongoose.model('Article', articleSchema);
const articleValidationSchema = Joi.object({
    articleTitle: Joi.string().required(),
    articleDescription: Joi.string().required(),
    articleBody: Joi.string().required(),
    image: Joi.string().required(),
    createdDate: Joi.date().required(),
    authorName: Joi.string().required(),
});
module.exports = {
    Article,
    articleValidationSchema
};