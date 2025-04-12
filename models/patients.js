const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
const Appointment = require('./appointment');
;
const patientSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true,"A user with this email already exists"]
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: [true,"This Phone number allready exist in ou Data Base"]
    },
    appointments:[{
        type:Schema.Types.ObjectId,
        ref:'Appointment'
    }]
})


patientSchema.post('findOneAndDelete', async (patient) =>{
    if(patient.appointments.length){
        await Appointment.deleteMany({_id: { $in: patient.appointments} })
    }
});

patientSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Patient',patientSchema)
