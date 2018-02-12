'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    created_date: {
        type: Date,
        default: Date.now
      },
});

module.exports = mongoose.model('Users', Users);