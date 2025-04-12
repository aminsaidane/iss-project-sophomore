const mongoose = require('mongoose');
const { Hospital } = require('./hospitals');
const patients = require('./patients');
const { Schema } = mongoose;


const appointmentSchema= new Schema({
    date:String,
    time:String,
    hospital:{
        type: Schema.Types.ObjectId,
        ref:'Hospital'
    },
    patient:{
        type: Schema.Types.ObjectId,
        ref:'Patient'
    },
    doctor:{
        type:Schema.Types.ObjectId,
        ref:'Doctor'
    }
})

module.exports = mongoose.model('Appointment',appointmentSchema);
