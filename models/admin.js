const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
const { Hospital } = require('./hospitals');


const adminSchema = new Schema({
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
    hospitals:[{
        type: Schema.Types.ObjectId,
        ref:'Hospital'
    }]
})

adminSchema.post('findOneAndDelete', async(admin) =>{
    if(admin.hospitals.length){
        await Hospital.deleteMany({ _id : { $in : admin.hospitals } })
    }
})

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin',adminSchema);