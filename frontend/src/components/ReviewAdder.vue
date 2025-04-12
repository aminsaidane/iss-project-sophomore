<script setup>
import { reactive } from 'vue';
import { userStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import axios from 'axios';
import router from '@/router';


const route = useRoute();
const Hospital_id = route.params.id

const store = userStore()
const userId = store.id;
const type = store.type;
const form = reactive({
    review:{
        body:'',
        rating:0,
        author:userId
    }
})

const handleAddReview = async() =>{
    const review = form.review
    try{
        const response = await axios.post(`/api/hospitals/${Hospital_id}/reviews`, review)
        router.go()
    }catch(err){
        console.log(err)
    }
}
</script>


<template>
    <div class="card mb-3">
        <h2 class="text-center mt-2">Leave a Review</h2>
        <form class=" card-body  validated-form"  novalidate>
            <label class="form-label" for="review">Review :</label>
            <div class="">
                <fieldset class="starability-coinFlip">
                    <input type="radio" id="no-rate" class="input-no-rate" name="review[rating]" value="0" checked aria-label="No rating." />
                    <input v-model="form.review.rating" type="radio" id="first-rate1" name="review[rating]" value="1" />
                    <label for="first-rate1" title="Terrible">1 star</label>
                    <input v-model="form.review.rating" type="radio" id="first-rate2" name="review[rating]" value="2" />
                    <label for="first-rate2" title="Not good">2 stars</label>
                    <input v-model="form.review.rating" type="radio" id="first-rate3" name="review[rating]" value="3" />
                    <label for="first-rate3" title="Average">3 stars</label>
                    <input v-model="form.review.rating" type="radio" id="first-rate4" name="review[rating]" value="4" />
                    <label for="first-rate4" title="Very good">4 stars</label>
                    <input v-model="form.review.rating" type="radio" id="first-rate5" name="review[rating]" value="5" />
                    <label for="first-rate5" title="Amazing">5 stars</label>
                  </fieldset>
            </div>
            <div class="mb-2">
                <textarea v-model="form.review.body" class="form-control" name="review[body]" id="body" cols="30" rows="3" required></textarea>
            </div>
            <button @click.prevent="handleAddReview" class="btn btn-success">Submit</button>
        </form> 
    </div>
   
</template>