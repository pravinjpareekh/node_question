'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
    let tmpUser = req.body;
    let hash = bcrypt.hashSync(tmpUser.password, 10);
    tmpUser.password = hash;
    const newUser = User(tmpUser);
    newUser.save((err, userInfo) => {
        if (err) {
            res.json({ status: 'error' });
        }
        res.json(userInfo);
    });
}

exports.authenticateUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.json({ status: 'error', message: err });
        } else {
            if (!user) {
                res.json({ status: 'error', message: 'User not found' });
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {id: user._id};
                    var token = jwt.sign(payload, 'tasmanianDevil');
                    res.json({ status: 'success', token: token });
                } else {
                    res.json({ status: 'error', message: 'Please check password' });
                }
            }
        }
    });
}
