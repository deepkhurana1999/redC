/*
    Schema and Model trying to represent essentials details of the user
    with association of particular user with the comments user had post 
    on the service.
*/
const mongoose  = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config =  require('config');

mongoose.connect('mongodb://localhost/dbReddit', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to database...'))
    .catch(err => console.log('Couldn \'t connect to databse'));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4, 
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 1024
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

userSchema.methods.generateAuthToken = function()
{
    const token = jwt.sign({_id: this._id}, 'key');//config.get('jwtPrivateKey'));
    return token;
}

const writer = mongoose.model('Writer', userSchema);

function validateUser(user)
{
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().min(5).max(1024).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    
    return schema.validate(user);
}


module.exports.User = writer;
module.exports.validate = validateUser;