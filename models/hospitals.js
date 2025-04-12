const mongoose = require('mongoose');
const {Doctor} = require('./doctors');
const { Schema } = mongoose


const HospitalSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    imgUrl:{
        type: String,
        required: true
    },reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Review'
    }],
    doctors : [
        {type : Schema.Types.ObjectId , ref :'Doctor'}
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"Admin"
    }
})
HospitalSchema.post('findOneAndDelete', async (hospital) =>{
    if(hospital.doctors.length){
        await Doctor.deleteMany({_id: { $in: hospital.doctors } })
    }
})

module.exports.Hospital = mongoose.model('Hospital', HospitalSchema);