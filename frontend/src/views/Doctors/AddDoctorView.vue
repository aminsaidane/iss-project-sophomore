<script setup>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { userStore } from '@/stores/user';

const store = userStore()
const userId = store.id
const type = store.type


const route = useRoute();
const router = useRouter();
const toast = useToast();
const Hospital_id = route.params.Hospital_id

const form = reactive({
    doctor:{
        userusername:'',
        speciality:'',
        imgUrl:'',
        password:''
    }
});

onMounted(async()=>{
  const response = await axios.get(`/api/hospitals/${Hospital_id}`)
  const hospital = response.data
  console.log(hospital)
  if(type !== 'Admin' || userId !== hospital.owner._id){
 toast.error('Access Denied')
  router.push('/hospitals')
  }
 
})

const handleAddDoctor = async() =>{
    const newDoctor = {...form.doctor}
    try{
        const response = await axios.post(`/api/hospitals/${Hospital_id}/doctors/add`,newDoctor)
        toast.success('Doctor Added Successfully')
        router.push(`/hospitals/${Hospital_id}`)
    }catch(err){
        console.error(err)
    }
}



</script>



<template>
<div class="row">
    <h1 class="text-center">Add Doctor</h1>
    <div class="col-6 offset-3">
  <form @submit.prevent="handleAddDoctor"  novalidate class="validated-form">
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
    <div class="mb-3">
      <label class="form-label" for="password">password</label>
      <input v-model="form.doctor.password" class="form-control" type="text" username="doctor[password]" id="password" required>
      <div class="invalid-feedback">
            password Required
        </div> 
    </div>
    <button class="btn btn-success">Add doctor</button>
    <a class="btn btn-secondary ms-3" href="/doctors">All doctors</a>
  </form>
  
  </div>
  </div></template>