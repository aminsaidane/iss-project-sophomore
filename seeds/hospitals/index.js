const mongoose = require('mongoose');
const { Hospital } = require('../../models/hospitals');
const cities = require('./cities');
const urls= require('./seedHelpers');
const hospitals = require('./hospitalSeeds');
const Admin = require('../../models/admin');



mongoose.connect('mongodb://localHost:27017/Health-care').then(()=>{
    console.log("connected to mongoose");
}).catch((err)=>{
    console.log(err)
})



const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB= async () =>{
    await Hospital.deleteMany({});
    const Owner = await Admin.findById("67e233db61097e49dc27a91f")
    for(let i = 0; i < 20; i++){
        const hospital = new Hospital({
            location: hospitals[i].location,
            title: hospitals[i].title,
             imgUrl:urls[i].url,
            description: hospitals[i].description,
            email:"admin@gmail.com",
            phoneNumber:91000000,
            owner:"67e233db61097e49dc27a91f"
        })
        Owner.hospitals.push(hospital);
        await hospital.save();
    }
    await Owner.save();
}
seedDB().then(()=>{
    mongoose.connection.close()
});