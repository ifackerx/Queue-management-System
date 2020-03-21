const mongoose = require('mongoose');

const queue = new mongoose.Schema({
    queue_name :{
        type:String,
    },
    queue_create :{
        type:String,
    },
    queue_priority:{
        type:Number,
    },
    queue_date:{
        type:String,
    },
    queue_score:{
        type:Number,
    },
    queue_about:{
        type:String
    }
});

module.exports = Queue = mongoose.model('queue', queue)