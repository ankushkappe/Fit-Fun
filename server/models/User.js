const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    Original: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

// Hash password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.Original = this.password;
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model("User", userSchema);
