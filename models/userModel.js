const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
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
    type: {
        type: Number,
        default: 0, //0: student, 1: teacher
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
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