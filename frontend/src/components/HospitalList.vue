<script setup>
import { onMounted,reactive,computed } from 'vue';
import HospitalCard from './HospitalCard.vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
const state =reactive({
  hospitals:[],
  isLoading:true,
  input:''
});

onMounted(async()=>{
  try{
    const response = await axios.get('/api/hospitals')
    state.hospitals= response.data
  }catch(error){
    console.error('error')
  }finally{
    state.isLoading = false;
  }
})
const hospitalsQuery = computed(()=>{
  let hospitals = state.hospitals
  let input = state.input
  if(input){
     hospitals =hospitals.filter((hospital)=>{
    return hospital.title.toUpperCase().includes(input.toUpperCase(),0)
  })
  }

  return hospitals
})
</script>

<template>
<div>
    <h1 class="text-center mb-4">Our Hospitals</h1>
    <input v-model="state.input" class="form-control mb-3 text-center" placeholder="Search" type="text" name="" id="">
    <div v-if="state.isLoading" class="text-center text-primary my-5">
      <PulseLoader loading="loading" color="blue"/>
    </div>
    <div v-else>
      <HospitalCard v-for="hospital in hospitalsQuery" :key="hospital.id" :hospital="hospital"  />
    </div>
    
</div>
</template>