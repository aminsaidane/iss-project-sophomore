<script setup>
import { reactive,defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props =defineProps({
  hospital:Object
})
</script>

<template>
<div class="card mb-3">
  <div class="row">
    <div class="col-md-4">
      <img style="max-height: 260px ;" :src="hospital.imgUrl"  class="card-img-top img-fluid" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ hospital.title }} </h5>
        <p class="card-text"> {{hospital.description}} </p>
        <p class="card-text">
            <small class="text-muted"> {{hospital.location}} </small>
        </p>
        <RouterLink :to="`/hospitals/${hospital._id}`" class="btn btn-primary mt-1 ">Show Hospital</RouterLink>
      </div>
    </div>
    </div>
  </div>
</template>