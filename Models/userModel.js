const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
})


const user = mongoose.model('user',userSchema)

module.exports = user;