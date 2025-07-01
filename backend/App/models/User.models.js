"use strict"

const { Schema, model } = require('mongoose');

const userModel = Schema({
    FullName: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    UserName: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    PhoneNo: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 10,
        default: null
    },
    password: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    add_by: {
        type: String,
        trim: true,
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now
    },



},
    {
        timestamps: true
    },

)
const User_model = model('USERS', userModel);




module.exports = User_model;
