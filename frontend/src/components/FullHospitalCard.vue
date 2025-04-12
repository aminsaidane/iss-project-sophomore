<script setup>
import axios from 'axios';
import { reactive,defineProps, computed } from 'vue';
import { RouterLink,useRouter,useRoute } from 'vue-router'
import { useToast } from 'vue-toastification';
import { userStore } from '@/stores/user'

const store = userStore();
const type = store.type
const  userId = store.id


const props = defineProps({
    hospital:Object,
    owner:Object,
    length:Number,
})
const state = reactive({
    reviews:props.hospital.reviews
})
const router = useRouter()
const route = useRoute()
const toast = useToast()

const id = route.params.id
const handleDelete= async() =>{
  const confirm = window.confirm('Are You Sure You Want to Delete the Hospital')
  if(confirm){
    if(props.owner._id !==userId){
      toast.error('You Do Not Have Permission To Delete The Hospital')
      router.push('/hospitals')
    }else{
         try{
    const response = await axios.delete(`/api/hospitals/${id}`)
    toast.warning(`The ${response.data.title} Hospital Was Deleted`)
    router.push('/hospitals')
  }catch(err){
    console.error(err)
  }}
    }
 
}

</script>

<template>
 
  <div :class="[!props.length && type!='Patient' ? 'col-11':'col-6' ]">
    <div class="card vh-50 mt-2 mb-4">
      <img
        style="max-height: 420px"
        :src="hospital.imgUrl"
        class="card-img-top img-fluid"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title"> {{hospital.title}} </h5>
        <p class="card-text"> {{hospital.description}} </p>
      </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">{{hospital.location}} </li>
        <li class="list-group-item">email: {{ hospital.email}} </li>
        <li class="list-group-item">Number: {{hospital.phoneNumber}} </li>
        <li class="list-group-item">Owner: {{owner.username}} </li>
      </ul>
      <div v-if="type==='Admin' && owner._id===userId" class="card-body">
        <RouterLink 
          class="card-link btn btn-secondary"
          :to="`/hospitals/${hospital._id}/edit`"
          >Edit</RouterLink
        >
        <form 
          class="d-inline"
         @click.prevent="handleDelete"
        >
          <button class="btn btn-danger ms-2">Delete</button>
        </form>
      </div>
    </div>
  </div>

</template>