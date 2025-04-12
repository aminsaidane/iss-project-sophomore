<script setup>
import { userStore } from '@/stores/user';
import router from '@/router';
import axios from 'axios';

const store = userStore();
const userId =store.id;
const type = store.type ;

const props = defineProps({
    review:Object,
    hospitalId:''
})

const handleDeleteReview = async() => {
    try{
        const response = await axios.delete(`/api/hospitals/${props.hospitalId}/reviews/${props.review._id}`)
        router.go();
    }catch(err){
        console.log(err);
    }
}
</script>


<template>
    <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title"> {{review.author.username}} </h5>
                    <p class="starability-result" :data-rating=" review.rating ">
                      Rated:  {{review.rating}}  stars
                    </p>
                    <p class="card-text">Review:  {{review.body}} </p>
                        <button v-if="userId === review.author._id" @click="handleDeleteReview" class="btn btn-sm btn-danger">Delete</button>
                </div>
            </div>
</template>