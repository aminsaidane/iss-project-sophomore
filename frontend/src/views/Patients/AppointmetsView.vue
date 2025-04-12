<script setup>
import axios from 'axios';
import { reactive, onMounted,  } from 'vue';
import { userStore } from '@/stores/user';
import AppointmentCard from '@/components/AppointmentCard.vue'
const store = userStore();
const userId = store.id


const state = reactive({
    appointments:[]
})

onMounted( async() =>{
try{
    const response =await axios.get(`/api/appointments/patients/${userId}`)
    state.appointments= response.data
}catch(err){
    console.log(err)
}
})
</script>


<template>
    <div>
        <h1 class="text-center mb-5">View appointments</h1>
        <div class="row  mb-3 offset-1 m-">
                <AppointmentCard v-for="APT in state.appointments" :key="APT._id" :appointment="APT" :doctor="APT.doctor" :hospital="APT.hospital"/>
        </div>
    </div>
    
</template>

