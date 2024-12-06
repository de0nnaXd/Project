//User Model
let mongoose = require ('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    username:
    {
        type:String,
        default:"",
        trim:true,
        required:'Username is required to login'
    },
    /*FOR NOW, password is commented(will come back to fix)
    password:
    {
        type:String,
        default:"",
        trim:true,
        required:'Password is required to login'
    }, */

    displayName:
    {
        type:String,
        default:"",
        trim:true,
        required:'Display Name is required to login'
    },
    created:{
        type:Date,
        default: Date.now
    },
    update:{
        type:Date,
        default: Date.now
    }
},
{
    collections: "user"
}
)

//Options for User model
let options = ({MissingPasswordError:'Your Password is Incorrect/Missing'});
User.plugin(passportLocalMongoose,options);
module.exports.User = mongoose.model('User', User);
