const mongoose = require('mongoose');
const URL = 'mongodb+srv://waiwarit:1234@waritk-kv4yc.gcp.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async() => {
    await mongoose.connect(URL, {useUnifiedTopology:true, useNewUrlParser:true});
    console.log('db connect..');
};

module.exports = connectDB