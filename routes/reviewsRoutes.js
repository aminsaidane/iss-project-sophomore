const express = require('express');
const router = express.Router();
const { Hospital } = require('../models/hospitals');
const Review = require('../models/review');




router.post('/hospitals/:Hospital_id/reviews', async(req,res)=>{
    console.log(req.body)
    const { Hospital_id } = req.params;
    const  hospital = await Hospital.findById(Hospital_id);
    const newReview = new Review(req.body);
    hospital.reviews.push(newReview);
    await hospital.save();
    await newReview.save();
    res.send(newReview)
});

router.delete('/hospitals/:Hospital_id/reviews/:Review_id', async(req,res)=>{
    const {Hospital_id, Review_id}= req.params;
    const hospital = await Hospital.findByIdAndUpdate(Hospital_id, {$pull:{reviews:Review_id}});
    const deletedReview = await Review.findByIdAndDelete(Review_id);
    res.send(deletedReview)
});






module.exports= router
