<script setup>


import { userStore } from '@/stores/user'
const store = userStore()
const username = store.username
const type = store.type
const id = store.id
</script>


<template>
    <div>
        {{ type }}
        {{ id }}
    </div>
</template>

<style scoped>
@import "tailwindcss";
</style>