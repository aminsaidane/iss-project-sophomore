const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const Appointment = require('./appointment');
const passportLocalMongoose = require('passport-local-mongoose');


const DoctorSchema = new Schema({
    speciality :{
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required:true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref:'Hospital'
    },
    appointments:[{
        type:Schema.Types.ObjectId,
        ref:'Appointment'
    }]
});


DoctorSchema.post('findOneAndDelete', async (doctor) =>{
    if(doctor.appointments.length){
        await Appointment.deleteMany({_id: { $in: doctor.appointments} })
    }
})
DoctorSchema.plugin(passportLocalMongoose);

module.exports.Doctor = mongoose.model('Doctor', DoctorSchema);