<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { userStore } from '@/stores/user';
const store= userStore();
const router = useRouter();
const toast = useToast();
const userId = store.id
const form = reactive({
    hospital:{
        title:'',
        location:'',
        description:'',
        email:'',
        phoneNumber:'',
        imgUrl:''
    }
})

const handleSubmit = async() =>{
    const newHospital={
        title:form.hospital.title,
        location:form.hospital.location,
        description:form.hospital.description,
        email:form.hospital.email,
        phoneNumber:form.hospital.phoneNumber,
        imgUrl:form.hospital.imgUrl,
        owner:userId
    }
    try{
        const response = await axios.post('/api/hospitals',newHospital)
        toast.success('Hospital Added Successfully');
        router.push(`/hospitals/${response.data._id}`)
    }catch(err){
        console.error(err)
    }
}
</script>



<template>
    <div class="row">
    <h1 class="text-center">New Hospital</h1>
    <div class="col-6 offset-3">
  <form  @submit.prevent="handleSubmit" novalidate class="validated-form">
    <div class="mb-3">
      <label class="form-label" for="title">Hospital title</label>
      <input v-model="form.hospital.title" class="form-control" type="text" name="hospital[title]" id="title" required />
      <div class="invalid-feedback">
            Title Required
          </div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="location">Hospital location</label>
      <input v-model="form.hospital.location" class="form-control" type="text" name="hospital[location]" id="location" required />
      <div class="invalid-feedback">
            Location Required
          </div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="description">Hospital description</label>
      <textarea v-model="form.hospital.description" class="form-control" name="hospital[description]" id="description" required></textarea>
      <div class="invalid-feedback">
            Description Required
          </div>
    </div>
    <div class="mb-3">
        <label class="form-label" for="email">Hospital Email</label>
        <input v-model="form.hospital.email" class="form-control" type="text" name="hospital[email]" id="email" required />
        <div class="invalid-feedback">
              Description Required
            </div>
      </div>
    <div class="mb-3">
        <label class="form-label" for="number">Hospital Number</label>
        <div class="input-group">
          <span class="input-group-text" id="price-label">$</span>
          <input v-model="form.hospital.phoneNumber" class="form-control" type="text"  id="number" placeholder="Ex 90000000" aria-label="price"
          aria-describedby="price-label" name="hospital[phoneNumber]" required/>
          <div class="invalid-feedback">
              Price Required
            </div>
        </div>
      </div>
    <div class="mb-3">
      <label class="form-label" for="image">Image Url</label>
      <input v-model="form.hospital.imgUrl" class="form-control" type="text" name="hospital[imgUrl]" id="image" required>
      <div class="invalid-feedback">
            Image Required
        </div> 
    </div>
    <button class="btn btn-success">Add Hospital</button>
    <a class="btn btn-secondary" href="/hospitals">All Hospitals</a>
  </form>
  
  </div>
  </div>
</template>