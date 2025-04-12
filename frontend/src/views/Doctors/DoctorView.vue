<script setup>
import axios from 'axios';
import { reactive,onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { userStore } from '@/stores/user';
import { useToast } from 'vue-toastification';

const toast = useToast();


const store= userStore()
const userId= store.id;
const type = store.type;

const route = useRoute();
const router = useRouter()
const doctorId = route.params.id
const Hospital_id = route.params.Hospital_id



const handleChooseDate= async () =>{
  const date = state.date
  console.log(date)
  let appoinments=[]
   try{
     const response = await axios.get(`/api/appointments/${date}`,)
     appoinments=response.data
     console.log(appoinments)
   }catch(err){
     console.log(err)
   }
  state.appoinments= appoinments
   console.log(state.appoinments)
}



const timeSlots = computed(()=>{
  let startHour=10
  let startMinutes=0
  let startAppoinment =`${startHour}:${startMinutes}0`
  let timeSlots=[startAppoinment,]
  while(startHour!==14){
    startMinutes += 3
    if(startMinutes===6){
      startHour +=1
      startMinutes=0
    }
    timeSlots.push(`${startHour}:${startMinutes}0`)
  }
  if(state.appoinments){
    state.appoinments.forEach((apt) =>{
     timeSlots= timeSlots.filter((slot)=>{
        return slot != apt.time
      })
    })
  }
  return timeSlots
})


const state=reactive({
    doctor:{},
    hospital:{},
    isLoading:true,
    timeSlots:timeSlots,
    appoinments:[],
    date:'',
})


onMounted(async()=>{
    try{
        const response = await axios.get(`/api/hospitals/${Hospital_id}/doctors/${doctorId}`)
        state.doctor= {...response.data.doctor}
        state.hospital= {...response.data.hospital}
    }catch(err){
        console.error(err)
    }finally{
      state.isLoading= false
    }
})

const handleBookAPT= async (apt) =>{
  const newAPT = {
    date:state.date,
    time:apt,
    hospital:Hospital_id,
    doctor:doctorId,
    patient:userId
  }
  try{
    const response = await axios.post(`/api/appointments/patients/${userId}/doctors/${doctorId}`,newAPT)
    toast.success(`Appointment with Doctor ${state.doctor.username} Successfully Booked on The ${newAPT.date} At ${newAPT.time}`)
    router.push(`/patients/${userId}/appointments`);
  }catch(err){
    console.log(err)
  }
}

</script>

<template>
  <div>
    <div v-if="state.isLoading" class="row mb-3 text-center">
      <PulseLoader color="gray"/>
    </div>
    <div v-else class="row">
  <div :class="[ type != 'Patient' ? 'offset-3' :'', 'col-6' ]" >
    <div class="card mb-3">
      <img
        style="max-height: 600px"
        :src="state.doctor.imgUrl"
        class="card-img-top img-fluid"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title"> {{state.doctor.username}} </h5>
        <p class="card-text">- {{state.doctor.speciality}} </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{state.hospital.title}} </li>
        <li class="list-group-item">Location: {{state.hospital.location}} </li>
      </ul>
    </div>
  </div>
  <div v-if="type === 'Patient'" class="col-6">
    <div class="card">
      <div class="card-Body mb-3">
        <h3 class="card-title text-center mt-1">Book Apointment with {{state.doctor.name}}</h3>
        <div class="container">
          <svg class="offset-3" height="245" width="300" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-51.2 -51.2 614.40 614.40" xml:space="preserve" fill="#000000" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.024"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#93C7EF;" d="M222.312,336.366l-43.813-45.11l169.244-164.379c9.159-9.991,13.964-22.928,13.537-36.498 c-0.313-9.984-3.43-19.449-8.944-27.495h-66.493V0h93.151l9.074,8.522c22.299,20.941,35.105,49.311,36.064,79.884 c0.957,30.573-10.047,59.69-30.988,81.987l-1.012,1.03L222.312,336.366z"></path> <path style="fill:#C9E3F7;" d="M223.607,336.366L52.772,170.395C9.543,124.367,11.821,51.752,57.848,8.522L66.924,0h93.151v62.885 H93.597c-13.24,19.39-11.882,46.035,4.58,63.994l169.244,164.377L223.607,336.366z"></path> <path style="fill:#D80027;" d="M386.066,318.433v64.85c0,36.3-29.532,65.832-65.832,65.832s-65.832-29.532-65.832-65.832v-78.085 l55.211-53.623l-43.813-45.11l-42.84,41.609l-42.835-41.604l-43.813,45.11l55.206,53.619v78.085 c0,70.975,57.742,128.717,128.717,128.717s128.717-57.742,128.717-128.717v-64.85L386.066,318.433L386.066,318.433z"></path> <path style="fill:#A2001D;" d="M386.066,318.433v64.85c0,36.3-29.532,65.832-65.832,65.832s-65.832-29.532-65.832-65.832v110.551 C273.678,505.356,296.192,512,320.234,512c70.975,0,128.717-57.742,128.717-128.717v-64.85H386.066z"></path> <circle style="fill:#93C7EF;" cx="419.472" cy="331.213" r="70.745"></circle> <polygon style="fill:#A2001D;" points="254.402,305.198 309.613,251.574 265.8,206.464 254.402,217.535 "></polygon> <circle style="fill:#5A8BB0;" cx="419.472" cy="331.213" r="39.303"></circle> </g></svg>
          <!-- Welcome Text -->

          <!-- Calendar -->
          <FlatPickr @on-change="handleChooseDate" v-model="state.date" class="form-control my-4 " placeholder="Select a Date"/>
          <!-- Time Slots -->
           <div v-if="state.date">
            <div  v-for="apt in state.timeSlots" :key="apt" class="mb-3  offset-1">
              <button  @click="()=>{handleBookAPT(apt)}" class="btn btn-secondary time-slot col-11">{{apt}} AM</button>
            </div>
           </div>
           
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
    
</template>