const express = require('express');
const router = express.Router();
const { Hospital } = require('../models/hospitals');
const { Doctor } = require('../models/doctors');
const passport = require('passport');

router.get('/hospitals/:Hospital_id/doctors/:id', async(req,res)=>{
    const {id,Hospital_id} = req.params
    const hospital = await Hospital.findById(Hospital_id)
    const doctor = await Doctor.findById(id);
    res.send({doctor,hospital})
});
router.get('/hospitals/:Hospital_id/doctors/:id/edit', async(req,res) =>{
    const {id,Hospital_id} = req.params
    const hospital = await Hospital.findById(Hospital_id)
    const doctor = await Doctor.findById(id);
    res.send({doctor, hospital})
})
router.put('/hospitals/:Hospital_id/doctors/:id', async(req,res) =>{
    const {id,Hospital_id} = req.params
    const doctor = await Doctor.findByIdAndUpdate(id,req.body);
    res.send(doctor)
})
router.delete('/hospitals/:Hospital_id/doctors/:id', async(req,res) =>{
     const {id,Hospital_id} = req.params
     const deletedDoctor = await Doctor.findByIdAndDelete(id)
     const hospital = await Hospital.findById(Hospital_id).populate('doctors')
     hospital.doctors= hospital.doctors.filter((doctor)=>{
        return doctor._id != id
     })
     await hospital.save()

     res.send(deletedDoctor)
   
})
router.post('/hospitals/:Hospital_id/doctors/add', async(req,res)=>{
    const {Hospital_id} = req.params;
    const {username, speciality, imgUrl, password} = req.body
     const hospital = await Hospital.findById(Hospital_id);
     const newDoctor = new Doctor({username, speciality, imgUrl});
    const registeredDoctor = await Doctor.register(newDoctor,password)
     hospital.doctors.push(newDoctor);
     await hospital.save();
     console.log(registeredDoctor)
     res.send(newDoctor)
});


module.exports= router