'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
    question: {
        type: String,
        required: true
    },
    optionA: {
        type: String,
        required: true
    },
    optionB: {
        type: String,
        required: true
    },
    optionC: {
        type: String,
        required: true
    },
    optionD: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Questions', Question);