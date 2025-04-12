<script setup>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import { userStore } from '@/stores/user';

const store = userStore()
const userId = store.id
const type = store.type


const route = useRoute();
const router = useRouter();
const toast = useToast();
const id = route.params.id
const Hospital_id = route.params.Hospital_id
const form = reactive({
    doctor:{
        username:'',
        speciality:'',
        imgUrl:'',
        password:''
    }
})
onMounted(async()=>{
    let hospital
    try{
        const response = await axios.get(`/api/hospitals/${Hospital_id}/doctors/${id}/edit`)
        form.doctor=response.data.doctor
        hospital= response.data.hospital
    }catch(err){
        console.error(err)
    }
    if(type === 'Patient' || userId != (id && hospital.owner) ){
    toast.error('Access Denied')
    router.push('/hospitals')
  }
})
const handleEditDoctor = async() =>{
    const editedDoctor = {...form.doctor}
    try{
        const response = await axios.put(`/api/hospitals/${Hospital_id}/doctors/${id}`,editedDoctor)
        toast.success(`Doctor ${response.data.username} Was Edited Successfully`);
        if(type ==="Admin"){
          router.push(`/hospitals/${Hospital_id}`);
        }else if(type ==="Doctor"){
          router.push(`/doctors/${form.doctor._id}/appointments`)
        }
        
    }catch(err){
        console.error(err)
    }
}

</script>



<template>
<div class="row">
    <h1 class="text-center">Edit Doctor</h1>
    <div class="col-6 offset-3">
  <form @submit.prevent="handleEditDoctor"  novalidate class="validated-form">
    <div class="mb-3">
      <label class="form-label" for="username">Doctor username</label>
      <input v-model="form.doctor.username" class="form-control" type="text" username="doctor[username]" id="username" required />
      <div class="invalid-feedback">
            username Required
          </div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="speciality">Doctor Speciality</label>
      <input v-model="form.doctor.speciality" class="form-control" type="text" username="doctor[speciality]" id="speciality" required />
      <div class="invalid-feedback">
            speciality Required
          </div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="image">Image Url</label>
      <input v-model="form.doctor.imgUrl" class="form-control" type="text" username="doctor[imgUrl]" id="image" required>
      <div class="invalid-feedback">
            Image Required
        </div> 
    </div>
    
    <button class="btn btn-success">Edit doctor</button>
    <RouterLink class="btn btn-secondary ms-3" :to="`/hospitals/${Hospital_id}`">All doctors</RouterLink>
  </form>
  
  </div>
  </div></template>