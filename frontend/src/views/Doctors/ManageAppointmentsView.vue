<script setup>
import { onMounted, reactive } from "vue";
import DoctorAppointmentCardVue from "../../components/DoctorAppointmentCard.vue";
import { userStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router';
import axios from "axios";
const store = userStore();
const userId =store.id
const type= store.type;

const route = useRoute()
const id = route.params.Doctor_id
const state = reactive({
    appointments:[],
    doctor:Object,
    hospital:Object
})

onMounted( async() =>{
try{
    const response =await axios.get(`/api/appointments/doctors/${userId}`)
    console.log(response.data)
    state.appointments= response.data.appointments
    state.doctor= response.data.doctor
    state.hospital= state.doctor.hospital
}catch(err){
    console.log(err)
}
})
</script>



<template>
    <div class="row">
        <h1 class="text-center mb-5">Manage Appointments and Details</h1>
    <div :class="[state.appointments.length ? '':'offset-3' ,'col-6' ]">
    <div class="card vh-50  mb-4">
      <img
        style="max-height: 420px"
        :src="state.doctor.imgUrl"
        class="card-img-top img-fluid"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title"> {{state.doctor.username}} </h5>
        <p class="card-text"> {{ state.doctor.speciality }} </p>
      </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">{{state.hospital.title}} </li>
        <li class="list-group-item">{{state.hospital.location}} </li>
      </ul>
       <div v-if="type ==='Doctor' && id === userId" class="card-body">
        <RouterLink 
          class="card-link btn btn-secondary"
          :to="`/hospitals/${state.hospital._id}/doctors/${userId}/edit`"
          >Edit Details</RouterLink
        >
      </div>
    </div>
  </div>
        <div class="col-6">
            <DoctorAppointmentCardVue v-for="APT in state.appointments" :key="APT._id" :appointment="APT" :patient="APT.patient" :hospital="APT.hospital" />
        </div>
        
    </div>
</template>