const mongoose = require('mongoose');
const { Schema } = mongoose;


const reviewSchema = new Schema({
    body:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    author:{
        type : Schema.Types.ObjectId,
        ref: 'Patient'
    }
})

module.exports = mongoose.model('Review', reviewSchema);