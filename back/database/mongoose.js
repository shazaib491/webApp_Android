const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://127.0.0.1:27017/admin', {
        useNewUrlParser: true,
        useFindAndModify: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('connected to database')
    }).catch((err) => {
        console.log(err);
    });
const secret = "shazaib";
module.exports = mongoose;
module.exports.secret = secret;