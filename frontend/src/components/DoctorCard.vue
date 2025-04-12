<script setup>
import axios from 'axios';
import { reactive,defineProps } from 'vue';
import { RouterLink,useRouter,useRoute } from 'vue-router'
import { useToast } from 'vue-toastification';
import { userStore } from '@/stores/user'
const store = userStore();
const type = store.type
const userId = store.id

const toast = useToast();

const router = useRouter();
const Route = useRoute();
const id = Route.params.id;



const props=defineProps({
    doctor:Object,
    ownerId:'',
    Hospital_id:''
})



const handleDeleteDoctor = async() =>{
  if(props.ownerId !== userId){
    toast.error('You Do Not Have Permission To Delete The Doctor')
    router.push('/hospitals')
  }else{
    const confirm = window.confirm('Are You Sure You Want to Delete The Doctor Profile')
  if(confirm)
  {try{
    const response =await axios.delete(`/api/hospitals/${id}/doctors/${props.doctor._id}`)
    toast.warning(`Doctor  Was Deleted Successfully`)
    router.push(`/hospitals`)
  }catch(err){
    console.error(err)
  }}
  }
  
}
</script>


<template>
    <div class="col-3 offset-1  ">
    <div class="card mb-5">
      <img
        :src="doctor.imgUrl"
        style="height: 18rem"
        class="card-img-top"
      />
      <div class="card-body">
        <h5 class="card-title"> {{ doctor.username }} </h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">- {{doctor.speciality}} </li>
      </ul>
      
      <div  class="card-body d-flex m-auto">
        <RouterLink v-if="type ==='Patient'"
          class="card-link btn btn-primary"
          :to="`/hospitals/${Hospital_id}/doctors/${doctor._id}`"
          >Book</RouterLink
        >
        <RouterLink v-else
          class="card-link btn btn-primary"
          :to="`/hospitals/${Hospital_id}/doctors/${doctor._id}`"
          >View</RouterLink
        >
        <div class="ms-3" v-if="type ==='Admin' && ownerId=== userId ">
          <RouterLink
          class="card-link btn btn-secondary"
          :to="`/hospitals/${Hospital_id}/doctors/${doctor._id}/edit`"
          >Edit</RouterLink
        >
        <form @submit.prevent="handleDeleteDoctor"  class="d-inline">
          <button  class="btn btn-danger ms-3">Delete</button>
        </form>
        </div>
      </div>
    </div>
  </div>
</template>