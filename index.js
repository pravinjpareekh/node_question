const _ = require("lodash");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const Users = require('./api/models/user');
const Questions = require('./api/models/question');

// const users = [
//     {
//       id: 1,
//       name: 'jonathanmh',
//       password: '%2yx4'
//     },
//     {
//       id: 2,
//       name: 'test',
//       password: 'test'
//     }
//   ];
  
  let jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = 'tasmanianDevil';
  
  const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    //console.log('payload received', jwt_payload);
    // usually this would be a database call:
   // const user = users[_.findIndex(users, {id: jwt_payload.id})];
   Users.findOne({
     _id: jwt_payload.id
   }, (err, user) =>{
     if(err){
      next(null, false);
     }
     if(user){
      next(null, user);
     }
   });
    // const user =  {id: jwt_payload.id};

    // if (user) {
    //   next(null, user);
    // } else {
    //   //next(null, false);
    // }
  });
  
  passport.use(strategy);

const app = express();
app.use(passport.initialize());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://pravin:password@ds121088.mlab.com:21088/question',function(err) {
  if (err) console.log(err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({message: "Express is up!"});
});

const routes = require('./api/routes/questionRoutes');
routes(app, passport);

// app.post("/login", function(req, res) {
//     if(req.body.name && req.body.password){
//       var name = req.body.name;
//       var password = req.body.password;
//     }
//     // usually this would be a database call:
//     var user = users[_.findIndex(users, {name: name})];
//     if( ! user ){
//       res.status(401).json({status:"error",message:"no such user found"});
//     }
  
//     if(user.password === req.body.password) {
//       // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
//       var payload = {id: user.id};
//       var token = jwt.sign(payload, jwtOptions.secretOrKey);
//       res.json({status:"success", token: token});
//     } else {
//       res.status(401).json({message:"passwords did not match"});
//     }
//   });
  
  app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json({status:"success",data: "Success! You can not see this without a token", user: req.user});
  });
  
  app.get("/secretDebug",
    function(req, res, next){
      console.log(req.get('Authorization'));
      next();
    }, function(req, res){
      res.json("debugging");
  });

app.use(function(req, res) {
  res.status(404).json({message: "The requested resource was not found"})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log("Express running");
});