<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { computed } from 'vue'
import { userStore } from '@/stores/user'
import { useToast } from 'vue-toastification';
import router from '@/router';
const store = userStore()
const toast = useToast()

const form= reactive({
    user:{
        type:'Patient',
        username:'',
        password:''
    }
})
onMounted(()=>{
    if(store.id){
        router.push('/hospitals')
    }
})
const handleLogInUser= async()=>{
    const user = form.user
    try{
        const response = await axios.post('/api/login',user);
        console.log(response.data)
        store.setId(response.data._id)
        store.setUserName(response.data.username)
        store.setType(user.type)
        // toast.success(`Welecome Back ${user.username}`)
        // router.push('/hospitals')
        router.go()
    }catch(err){
        console.error(err)
    }
}
</script>


<template>
    <div>
        <h1 class="text-center">LogIn</h1>
<form @submit.prevent="handleLogInUser"  class="validated-form" novalidate>
    <div class="mb-5 mt-5 ">
        <label class="form-label" for="username">Username</label>
        <input v-model="form.user.username" class="form-control" type="text" id="username" name="username" required>
        <div class="valid-feedback">
            Looks good!
        </div>
    </div>

    <div class="mb-5 mt-5">
        <label class="form-label" for="password">Password</label>
        <input v-model="form.user.password" class="form-control" type="password" id="password" name="password" required>
        <div class="valid-feedback">
            Looks good!
        </div>
    </div>
    <div class="mb-3">
        <label class="form-label" for="type">Register as:</label>
        <select v-model="form.user.type" class="form-select" aria-label="Default select example">
          <option selected value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
    <button class="btn btn-success col-3 offset-4 mt-3 text-center">Login</button>
</form>
    </div>
</template>