<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { reactive } from 'vue';
import axios from 'axios';
import { userStore } from '@/stores/user'
const store = userStore()
const  id=store.id
const type= store.type
const isActiveLink = (routePath) => {
   const route = useRoute();

  return route.path === routePath;
}
const router = useRouter()
const handleLogOut= async() => {
  try{
   const response =await axios.post('/api/logout')
    store.$reset()
    router.go()
  }catch(err){
    console.error(err)
  }
}

</script>

<template>
    <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/Home">
        <svg class="d-inline-block align-text-top" height="24" width="30" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-51.2 -51.2 614.40 614.40" xml:space="preserve" fill="#000000" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.024"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#93C7EF;" d="M222.312,336.366l-43.813-45.11l169.244-164.379c9.159-9.991,13.964-22.928,13.537-36.498 c-0.313-9.984-3.43-19.449-8.944-27.495h-66.493V0h93.151l9.074,8.522c22.299,20.941,35.105,49.311,36.064,79.884 c0.957,30.573-10.047,59.69-30.988,81.987l-1.012,1.03L222.312,336.366z"></path> <path style="fill:#C9E3F7;" d="M223.607,336.366L52.772,170.395C9.543,124.367,11.821,51.752,57.848,8.522L66.924,0h93.151v62.885 H93.597c-13.24,19.39-11.882,46.035,4.58,63.994l169.244,164.377L223.607,336.366z"></path> <path style="fill:#D80027;" d="M386.066,318.433v64.85c0,36.3-29.532,65.832-65.832,65.832s-65.832-29.532-65.832-65.832v-78.085 l55.211-53.623l-43.813-45.11l-42.84,41.609l-42.835-41.604l-43.813,45.11l55.206,53.619v78.085 c0,70.975,57.742,128.717,128.717,128.717s128.717-57.742,128.717-128.717v-64.85L386.066,318.433L386.066,318.433z"></path> <path style="fill:#A2001D;" d="M386.066,318.433v64.85c0,36.3-29.532,65.832-65.832,65.832s-65.832-29.532-65.832-65.832v110.551 C273.678,505.356,296.192,512,320.234,512c70.975,0,128.717-57.742,128.717-128.717v-64.85H386.066z"></path> <circle style="fill:#93C7EF;" cx="419.472" cy="331.213" r="70.745"></circle> <polygon style="fill:#A2001D;" points="254.402,305.198 309.613,251.574 265.8,206.464 254.402,217.535 "></polygon> <circle style="fill:#5A8BB0;" cx="419.472" cy="331.213" r="39.303"></circle> </g></svg>
        E-Health
    </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a :class="[isActiveLink('/') ? 'active' : '','nav-link']" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a :class="[isActiveLink('/hospitals') ? 'active' : '','nav-link']" aria-current="page" href="/hospitals">Hospitals</a>
          </li>
          <li v-if="id && type==='Admin'" class="nav-item">
            <a :class="[isActiveLink('/hospitals/new') ? 'active' : '','nav-link']" aria-disabled="true" href="/hospitals/new">AddHospital</a>
          </li>
          <li v-if="!id" class="nav-item">
            <a :class="[isActiveLink('/signin') ? 'active' : '','nav-link']" aria-disabled="true" href="/signin">SignIn</a>
          </li>
          <li v-if="!id" class="nav-item">
            <a :class="[isActiveLink('/login') ? 'active' : '','nav-link']" aria-disabled="true" href="/login">LogIn</a>
          </li>
          <li  v-if="id && type==='Patient'" class="nav-item">
            <a :class="[isActiveLink(`/patients/${id}/appointments`) ? 'active' : '','nav-link']" aria-current="page" :href="`/patients/${id}/appointments`">View Appointments</a>
          </li>
          <li  v-if="id && type==='Doctor'" class="nav-item">
            <a :class="[isActiveLink(`/doctors/${id}/appointments`) ? 'active' : '','nav-link']" aria-current="page" :href="`/doctors/${id}/appointments`">Manage Appointments and Details</a>
          </li>
          <li  @click.prevent="handleLogOut" v-if="id" class="nav-item">
            <button :class="[isActiveLink('/logout') ? 'active' : '','nav-link']" aria-disabled="true" >LogOut</button>
          </li>
          
        </ul>
        <form action="/hospitalsQuerry" method="post" class="d-flex" role="search" >
          <input  name="input" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>