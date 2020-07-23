const mongoose = require('mongoose');
const config = require('./../mongoose');
const bycrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require:true,
         index: {unique: true, dropDups: true},
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true,
         index: {unique: true, dropDups: true},
    },
    city: {
        type: String,
        require: true
    }

})
const users = module.exports = mongoose.model('User', userSchema);

module.exports.addUser = function (newUSer, callback) {
    bycrypt.genSalt(10, (err, salt) => {
        bycrypt.hash(newUSer.password, salt, (err, hash) => {
            if (err) throw err;
            newUSer.password = hash;
            newUSer.save(callback)
        })
    })
}
module.exports.getUserByname = function (email, callback) {
    const query = { email:email};
    users.findOne(query, callback);
}
module.exports.comparePassword = function (candidiatePassword, hash, callback) {
    bycrypt.compare(candidiatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}

module.exports.getUserById = (id, callback) => {
    users.findById(id, callback);
}