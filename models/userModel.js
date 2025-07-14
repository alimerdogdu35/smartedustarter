const mongoose = require('mongoose');
const Counter = require('./counter.model');  // Counter modelini dahil et

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        enum: ['-1', '0', '1', '2'],//-1: banned, 0: inactive, 1: active
        default: 1,
    },
    type: {
        type: Number,
        default: 0, //0: normal, 1: gold, 2: vip 
    },
    lastLoginAt: {
        type: Date,
        default: Date.now // kayıt anında otomatik atanır
    }
},
    {
        timestamps: true,
    });

const User = mongoose.model('User', userSchema);

module.exports = User;