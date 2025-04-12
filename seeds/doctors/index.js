const mongoose = require('mongoose');
const { Doctor } = require('../../models/doctors');
const doctors = require('./doctors');
const { Hospital } = require('../../models/hospitals');
const { register } = require('../../models/patients');

mongoose.connect('mongodb://localHost:27017/Health-care').then(()=>{
    console.log("connected to mongoose");
}).catch((err)=>{
    console.log(err)
})






const seedDB= async (Hospital_id) =>{
    await Doctor.deleteMany({});
    for(let i = 0; i < 9; i++){
        const  newDoctor = new Doctor({
            username: doctors[i].name,
            speciality: doctors[i].specialty,
            imgUrl: doctors[i].imageUrl
        });
        const hospital = await Hospital.findById(Hospital_id);
        newDoctor.hospital=hospital
        const registeredDoctor = await Doctor.register(newDoctor,'admin')
         hospital.doctors.push(registeredDoctor)
        await hospital.save()
    }
}
seedDB("67e77b8213ceaed1e7d33b30").then(()=>{
    mongoose.connection.close()
});