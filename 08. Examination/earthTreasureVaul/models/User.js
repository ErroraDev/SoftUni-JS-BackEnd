const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 10,
        required: true
    },
    password: {
        type: String,
        minlength: 4,
        required: true
    },
    ownedStones: [{
        type: mongoose.Types.ObjectId,
        ref: 'Stone'
    }],
    likedStones: [{
        type: mongoose.Types.ObjectId,
        ref: 'Stone'
    }]
},
{ timestamps: true });

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.virtual('rePassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Passwords are not the same');
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;
