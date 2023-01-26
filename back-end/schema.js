const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    phone: Number,
    email: String,
    password: String,
    image: {
        type: String,
        default: null,
    },
    accountType: {
        type: String,
        default: "user",
    }
});


const User = mongoose.model("User", userSchema);

module.exports = {
    User,
}