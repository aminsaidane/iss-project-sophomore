<script setup>
import { onMounted,reactive } from 'vue';
import HospitalList from '../../components/HospitalList.vue'
import router from '@/router';
const state =reactive({
  hospitals:[],
  isLoading:true
});



</script>

<template>
<div>
    <HospitalList/>
</div>
</template>