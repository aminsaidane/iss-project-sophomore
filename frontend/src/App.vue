<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

import Footer from './components/Footer.vue';
</script>
<template>
  <div>
    <NavBar/>
    <main class="container mt-5">   
       <RouterView/> 
    </main>
    <!-- <Footer/> -->
  </div>
  
</template>
