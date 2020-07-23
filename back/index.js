const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('./database/mongoose');
const User = require('./database/model/users');
const info = require('./database/model/data');
const carts = require('./database/model/addtocart');
const request=require('./database/model/request');
const jwt = require('jsonwebtoken');
const passport = require('passport');
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
require('./database/passport')(passport);


//register user
app.post('/register', (req, res, next) => {

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        cpassword: req.body.cpassword,
        mobile: req.body.mobile,
        city: req.body.city,
    })
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    if (password !== cpassword) {
        res.json({
            msg: "password is not matching",
        })
    } else {
        User.addUser(newUser, (err, user) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Email or Mobile Already Registered",
                   
                });
            } else {
                res.json({
                    success: true,
                    msg: "user Registered"
                });

            }
        })
    }
})
//authenticate user
app.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    var password = req.body.password;
    User.getUserByname(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({
                success: false,
                msg: "user not found"
            })
        }else
        if(user){
        User.comparePassword(password, user.password, (err, ismtach) => {
            if (err) throw err;
            if (ismtach) {
                const token = jwt.sign({
                    user
                }, mongoose.secret, {
                    expiresIn: 604800 //1 week
                });
                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        mobile:user.mobile
                    }
                })
            } else {
                res.json({
                    success: false,
                    msg: "wrong password"
                })
            }
        })}
    })
})

app.get('/internet',(req,res,next)=>{
    info.users.getIndexes()
})

app.post('/data', (req, res, next) => {
    let data = new info({
        city: req.body.city,
        category: req.body.category,
        name: req.body.name,
        address: req.body.address
    })
    info.addData(data, (err, data) => {
        if (err) throw err;
        if (data) {
            res.json({
                success: true,
                msg: "data submitted"
            });
        }

    })
})
app.get('/detail', (req, res, next) => {
    info.find()
        .then(result => res.send(result))
        .catch(err => console.warn(err))
})
app.get('/detail/:_id', (req, res, next) => {
    info.find({
            _id: req.params._id
        })
        .then(result => res.send(result))
        .catch(err => console.warn(err))
})
app.get('/getAllCity', (req, res) => {
    info.find().distinct('city')
        .then(category => res.send(category))
        .catch(err => console.log(err));
})

app.get('/city/:city', (req, res) => {
    info.find().distinct('category', {
            city: req.params.city
        })
        .then(city => res.send(city))
        .catch((error) => console.log(error));
});
//get city according category
app.get('/category/:city/:category', (req, res) => {
    info.find({
            category: req.params.category,
            city: req.params.city
        })
        .then(category => res.send(category))
        .catch(err => console.log(err));
})
//get city according category

//addto carts
app.post('/addtocart/:id', (req, res, next) => {

    // var cardId=req.body._id;
    let cart = new carts({
        cardId:req.body._id,
        userId: req.body.userId,
        city: req.body.city,
        category: req.body.category,
        name: req.body.name,
        address: req.body.address
    });
    console.log(cart);

    carts.addCart(cart, (err, data) => {
        if (err) throw err;
        if (data) {
            res.json({
                success: true,
                msg: 'added to cart'
            });
        }
    })
})
//addto carts
//all carts
app.get('/carts',(req,res)=>{
    carts.find({})
    .then((data)=>res.json(data))
    .catch(err=>console.log(err));
});
//all carts
// all carts by id
app.get('/cartss/:_id',(req,res,next)=>{
    carts.find({_id:req.params._id})
    .then((data)=>res.json(data))
    .catch(err=>console.log(err));
});
// all carts by id

//count no of Records
app.get('/countCart/:userId', (req, res) => {
    carts.find({
            userId: req.params.userId
        }).count()
        .then((count) => res.json(count))
        .catch(err => console.log(err));
})
//count no of Records
// add to card display by id 
app.get('/allCart/:userId', (req, res) => {
    carts.find({
            userId: req.params.userId
        })
        .then((count) => res.json(count))
        .catch(err => console.log(err));
})
// add to card display by id 
// request
app.post('/request', (req, res, next) => {
    let data = new request({
        foreign: req.body.foreign,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile
    })
      request.addData(data, (err, data) => {
        if (err) throw err;
        if (data) {
            res.json({
                success: true,
                msg: "We Will Contact You Soon"
            });
        }

    })
})
//request
//pending
app.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.send(req.user);
})

//defualt not root
app.get('/', (req, res, next) => {
    res.send('nothing should be found');
});
//defualt not root

//server listen at this port
app.listen('3000', () => {
    console.log('server is running at no 3000');
});
//server listen at this port