/*
    General Schema and Model of the comment made by everyUser
*/
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbReddit', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to database...'))
    .catch(err => console.log('Couldn \'t connect to databse'));

const commentSchema = new mongoose.Schema(
{
        content: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 255
        },
        title:  {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 25
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment)
{
    const schema = Joi.object({
        content: Joi.string().min(10).max(255).required(),
        title: Joi.string().min(10).max(25).required().email()
    });

    return schema.validate(comment);
}


exports.Comment = Comment;
exports.validateComment = validateComment;