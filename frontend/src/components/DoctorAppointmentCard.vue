<script setup>
import { defineProps } from 'vue';
import { userStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const toast = useToast()
const router = useRouter();
const store = userStore();
const userId = store.id;
const type = store.type;
const props= defineProps({
    appointment:Object,
    patient:Object,
    hospital:Object
})


const handleCancelAppointment = async () =>{
  try{
    const response = axios.delete(`/api/appointments/${props.appointment._id}/patients/${props.patient._id}/doctors/${userId}`);
    toast.success('Appointment Canceled')
    router.push(`/doctors/${userId}/appointments`);
  }catch(err){
    console.log(err);
  }
}

</script>


<template>

        <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">Appointment with Mr/Mrs {{ patient.username }}  </h5>
                 </div>  
                 <ul class="list-group list-group-flush">
                 <li class="list-group-item">At: {{ hospital.title }} {{ hospital.location }} </li>
                 <li class="list-group-item">{{ hospital.location }}</li>
                  <li class="list-group-item fw-bold">-The: {{ appointment.date }} At {{ appointment.time }} </li>
                </ul>
                    <!-- <p class="card-text">At: {{ hospital.title }} {{ hospital.location }} </p>
                    <p class="card-text"> {{ hospital.location }} </p>
                    <p class="card-text">The {{ appointment.date }} At {{ appointment.time }} </p> -->
                    <form  class="card-body">
                        <button @click="handleCancelAppointment" class="btn btn-sm btn-danger">Cancel</button>
                    </form>
                
            </div>

    
</template>