const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hospitalRoutes = require('./routes/hospitalsRoutes');
const userRoutes = require('./routes/usersRoutes');
const doctorRoutes = require('./routes/doctorsRoutes')
const session = require('express-session');
const bodyParser = require('body-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Patient = require('./models/patients');
const Admin = require('./models/admin');
const { Doctor } = require('./models/doctors');
const Appointment = require('./models/appointment');
const appointmentRoutes =require('./routes/appointmentsRoutes')
const Review = require('./models/review');
const reviewRoutes = require('./routes/reviewsRoutes');
const { Hospital } = require('./models/hospitals');


mongoose.connect('mongodb://localHost:27017/Health-care').then(()=>{
    console.log("connected to mongoose");
}).catch((err)=>{
    console.log(err)
})


app.set('view engine', 'ejs');


app.use(bodyParser.json())
app.use(express.urlencoded({ extended:true }))



const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(Patient.authenticate()));

app.use((req,res,next)=>{
    if(req.body.type)
        { const type= req.body.type
    if(type==="Admin"){
        passport.use(new LocalStrategy(Admin.authenticate()));
    }else if(type ==="Patient"){
        passport.use(new LocalStrategy(Patient.authenticate()));
    }else if(type === "Doctor"){
        passport.use(new LocalStrategy(Doctor.authenticate()))
    }
}
   return next()
})




passport.serializeUser(Patient.serializeUser());
passport.deserializeUser(Patient.deserializeUser());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
passport.serializeUser(Doctor.serializeUser());
passport.deserializeUser(Doctor.deserializeUser());


app.get('/home', (req, res) => {
    res.send('Welcome to Our health care System')
})

app.use('',hospitalRoutes)
app.use('',userRoutes)
app.use('',doctorRoutes)
app.use('',appointmentRoutes)
app.use('',reviewRoutes)

//Review routes



app.listen('3000',() => {
    console.log('listening on 3000')
});
