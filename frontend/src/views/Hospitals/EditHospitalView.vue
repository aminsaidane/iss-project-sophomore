<script setup>
import axios from 'axios';
import { reactive,onMounted } from 'vue';
import { useRoute,useRouter,RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
const route = useRoute();
const router = useRouter();
const toast = useToast();
const id = route.params.id
const form = reactive({
    hospital:{
        title:'',
        location:'',
        description:'',
        email:'',
        phoneNumber:'',
        imgUrl:'',
    }
})
onMounted(async()=>{
    try{
        const response = await axios.get(`/api/hospitals/${id}`)
        form.hospital=response.data;
    }catch(err){
        console.error(err)
    }
})
const handleEdit = async()=>{
    const editedHospital ={...form.hospital}
    try{
        const response = await axios.put(`/api/hospitals/${id}`,editedHospital)
        toast.success(`The ${response.data.title} Hospital Was Edited Successfully`)
        router.push(`/hospitals/${response.data._id}`)
    }catch(err){
        console.error(err);
    }
}

    </script>


<template>
    <div class="row">
    <h1 class="text-center">Edit {{form.hospital.title}}</h1>
    <div class="col-6 offset-3">
  <form @submit.prevent="handleEdit" novalidate class="validated-form">
    <div class="mb-3">
      <label class="form-label" for="title">Hospital title</label>
      <input v-model="form.hospital.title"  class="form-control" type="text" name="hospital[title]" id="title" required />
      <div class="invalid-feedback">
            Title Required
          </div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="location">Hospital location</label>
      <input v-model="form.hospital.location"  class="form-control" type="text" name="hospital[location]" id="location" required />
      <div class="invalid-feedback">
            Location Required
          </div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="description">Hospital description</label>
      <textarea v-model="form.hospital.description" class="form-control" name="hospital[description]" id="description" required> </textarea>
      <div class="invalid-feedback">
            Description Required
          </div>
    </div>
    <div class="mb-3">
        <label class="form-label" for="email">Hospital Email</label>
        <input v-model="form.hospital.email"  class="form-control" type="text" name="hospital[email]" id="email" required />
        <div class="invalid-feedback">
              Description Required
            </div>
      </div>
    <div class="mb-3">
        <label class="form-label" for="Number">Hospital Number</label>
        <div class="input-group">
          <span class="input-group-text" id="Number-label">$</span>
          <input v-model="form.hospital.phoneNumber"  class="form-control" type="text"  id="Number" placeholder="Ex 90000000" aria-label="Number"
          aria-describedby="Number-label" name="hospital[phoneNumber]" required/>
          <div class="invalid-feedback">
              Number Required
            </div>
        </div>
      </div>
    <div class="mb-3">
      <label class="form-label" for="image">Image Url</label>
      <input v-model="form.hospital.imgUrl"  class="form-control" type="text" name="hospital[imgUrl]" id="image" required>
      <div class="invalid-feedback">
            Image Require
        </div> 
    </div>
    <button class="btn btn-success ">Edit Hospital</button>
    <RouterLink class="btn btn-secondary ms-3" to="/Hospitals">All Hospitals</RouterLink>
  </form>
  </div>
  </div>
  
</template>