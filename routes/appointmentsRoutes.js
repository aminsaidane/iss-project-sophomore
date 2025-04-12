const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');
const Appointment = require('../models/appointment');
const { Doctor }= require('../models/doctors');

router.post('/appointments/patients/:patient_id/doctors/:doctor_id', async(req,res) =>{
    const{ patient_id , doctor_id} =req.params;
    const patient = await Patient.findById(patient_id);
    const doctor = await Doctor.findById(doctor_id);
    const newAPT = new Appointment(req.body)
    patient.appointments.push(newAPT)
    doctor.appointments.push(newAPT)
    await doctor.save()
    await patient.save()
    await newAPT.save()
    res.send(newAPT)
})
router.get('/appointments/:date',async(req,res)=>{
    const { date } = req.params
    console.log(req.params)
    const appointments = await Appointment.find({date:date})
    console.log(appointments)
    res.send(appointments)
});
router.get('/appointments/patients/:patient_id', async(req,res)=>{
    const { patient_id } = req.params;
    const appointments= await Appointment.find({patient:patient_id}).populate('hospital').populate('doctor')
    res.send(appointments)
});
router.get('/appointments/doctors/:Doctor_id', async(req,res)=>{
    const { Doctor_id} = req.params;
    const appointments= await Appointment.find({doctor:Doctor_id}).populate('patient').populate('hospital')
    const doctor = await Doctor.findById(Doctor_id).populate('hospital')
    res.send({appointments, doctor})
})
router.delete('/appointments/:appointment_id/patients/:patient_id/doctors/:doctor_id',async(req,res) =>{
    const { appointment_id, patient_id, doctor_id } = req.params;
     await Patient.findByIdAndUpdate(patient_id,{$pull:{ appointments:appointment_id}});
     await Doctor.findByIdAndUpdate(doctor_id,{$pull:{ appointments:appointment_id}})
    const deletedAppointment = await Appointment.findByIdAndDelete(appointment_id);
    res.send(deletedAppointment)
});

module.exports = router