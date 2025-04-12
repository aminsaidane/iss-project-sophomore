<script setup>
import { defineProps } from 'vue';
import { userStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();
const store = userStore();
const userId = store.id;
const type = store.type;
const props= defineProps({
    appointment:Object,
    doctor:Object,
    hospital:Object
})


const handleCancelAppointment = async () =>{
  try{
    const response = axios.delete(`/api/appointments/${props.appointment._id}/patients/${userId}/doctors/${props.doctor._id}`);
    router.go();
  }catch(err){
    console.log(err);
  }
}
</script>


<template>
     <div class="col-3 m-auto mx-4 ">
    <div class="card mb-5">
      <img
        :src="doctor.imgUrl"
        style="height: 14rem"
        class="card-img-top"
      />
      <div class="card-body">
        <h5 class="card-title"> Appoinntment With Dr {{ doctor.name }} {{ doctor.speciality }} </h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Date: {{appointment.date}}, At: {{ appointment.time }} </li>
        <li class=" list-group-item">At {{ hospital.title }}</li>
      </ul>
      
       <div  class="card-body d-flex m-auto">
          <button @click="handleCancelAppointment" class="card-link btn btn-danger">Cancel</button>
      </div> 
    </div>
  </div>
</template>