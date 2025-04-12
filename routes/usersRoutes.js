const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');
const Admin = require('../models/admin');
const passport = require('passport');


router.get('/signin', (req,res) => {
    res.render('users/register')
});
router.get('/login', (req,res) =>{
    res.render('users/logIn');
});
router.post('/register/patient', async(req, res, next)=>{
    const {email, phoneNumber, password, username } = req.body
    const patinet = new Patient({email,phoneNumber,username});
    const registeredPatient = await Patient.register(patinet,password)
    req.login(registeredPatient, err => {
        if (err) return next(err);
        res.send(registeredPatient)
    })  
})
router.post('/login',passport.authenticate('local', {failureMessage:"Invalid UserName or Password", failureRedirect:'/login'}),async(req,res,next)=>{
    res.send(req.user)
})
router.post('/logout',(req,res,next)=>{
    req.logout((err) => {
        if (err) {
           return next(err);
        }
        res.send({message:"loggedOut"})
     })
});
router.post('/register/admin', async(req, res, next)=>{
    const {email, phoneNumber, password, username } = req.body
    const admin = new Admin({email,phoneNumber,username});
    const registeredAdmin = await Admin.register(admin,password)
    req.login(registeredAdmin, err => {
        if (err) return next(err);
        res.send(registeredAdmin)
    })  
});

module.exports = router