<script setup>
import { useRoute, useRouter,RouterLink } from "vue-router";
import FullHospitalCardVue from "../../components/FullHospitalCard.vue";
import { reactive,onMounted } from "vue";
import axios from "axios";
import DoctorCard from  "../../components/DoctorCard.vue"
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { userStore } from '@/stores/user'
import reviewCard from "@/components/reviewCard.vue";
import ReviewAdder from "@/components/ReviewAdder.vue";
const store = userStore();
const type = store.type
const userId =store.id  
const route = useRoute()
const hospitalId = route.params.id
const state = reactive({
    hospital:{},
    doctors:[],
    owner:{},
    reviews:[],
    isLoading: true
})
onMounted(async() =>{
  try{
    const response = await axios.get(`/api/hospitals/${hospitalId}`);
    state.hospital = response.data
    state.doctors= response.data.doctors
    state.owner= response.data.owner
    state.reviews = state.hospital.reviews
  }catch(error){
    console.error('Error fetching hospital',error);
  }finally{
    state.isLoading = false;
  }
})
</script>


<template>
    <div>
         <h1 class="offset-4 mb-3">{{state.hospital.title}}</h1>
         <div class="row">
          <FullHospitalCardVue :hospital="state.hospital" :length="state.reviews.length"  :owner="state.owner"/>
            <div class="col-6">
              <ReviewAdder v-if="type === 'Patient'"/>
              <reviewCard v-for="review in state.hospital.reviews" :key="review._id" :review="review" :hospitalId="state.hospital._id"/>
            </div>
           
         </div>
        
        <div v-if="state.isLoading" class="row mb-3 text-center">
          <PulseLoader color="gray"/>
        </div>
        <div v-else class="row mb-3">
            <DoctorCard v-for="doctor in state.doctors.slice(0,12)" :key="doctor._id" :doctor="doctor" :Hospital_id="state.hospital._id" :ownerId="state.owner._id"/>
        </div>
        <RouterLink v-if="type==='Admin' && state.owner._id === userId" :to="`/hospitals/${state.hospital._id}/doctors/add`" class="btn btn-secondary col-3 offset-5 mb-3">Add doctor</RouterLink>
    </div>
   
</template>