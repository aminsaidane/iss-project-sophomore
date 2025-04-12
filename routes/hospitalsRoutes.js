const express = require('express');
const router = express.Router();
const { Hospital } = require('../models/hospitals');
const Admin = require('../models/admin');




// router.post('/hospitalsQuerry', async(req,res)=>{
//     const { input } = req.body;
//     const hospitals = await Hospital.find({
//         title: { $regex: input, $options: 'i' }})
//     res.render('hospitals/hospitals',{hospitals})
// });
router.get('/hospitals', async (req, res) => {
     const hospitals = await Hospital.find({})
     res.send(hospitals)
});
router.get('/hospitals/new', (req,res) => {
    res.render('hospitals/new')
});
router.get('/hospitalpage', (req, res)=>{
    res.render('hospitals/hospitalPage')
})
router.get('/hospitals/:Hospital_id/edit', async(req,res)=>{
    const { Hospital_id } = req.params;
    const hospital = await Hospital.findById(Hospital_id);
    res.send(hospital)
})
router.get('/hospitals/:Hospital_id', async (req,res) => {
    const { Hospital_id } = req.params
    const hospital = await Hospital.findById(Hospital_id).populate('doctors').populate('owner').populate({
        path: 'reviews',
        populate : {
            path: 'author'
        }
    })
    res.send(hospital)
})
router.post('/hospitals', async (req,res) => {
     console.log(req.body)
     const ownerId = req.body.owner;
     const Owner = await Admin.findById(ownerId)
     const hospital = new Hospital(req.body);
     Owner.hospitals.push(hospital);
        await Owner.save();
        await hospital.save();
        res.send(hospital)
});
router.put('/hospitals/:Hospital_id', async (req,res) =>{
    const { Hospital_id } = req.params
    const updatedHospital = await Hospital.findByIdAndUpdate(Hospital_id,req.body,{ runValidators:true })
    res.send(updatedHospital)
});
router.delete('/hospitals/:Hospital_id', async (req,res) => {
    const { Hospital_id } = req.params;
    const deletedHospital = await Hospital.findByIdAndDelete(Hospital_id);
    res.send(deletedHospital)
});

module.exports = router;