<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { userStore } from "@/stores/user";
import { useRouter } from "vue-router";
const store = userStore();
const router = useRouter();
const form = reactive({
  user: {
    type: "Patient",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  },
});

onMounted(() => {
  if (store.id) {
    router.push("/hospitals");
  }
});

const handleAddUser = async () => {
  const newUser = form.user;
  let response
  try {
    if(newUser.type==="Patient"){
         response = await axios.post("/api/register/patient", newUser);
    }else if(newUser.type==="Admin"){
        console.log("admin")
         response = await axios.post("/api/register/admin", newUser);
    }
    store.setId(response.data._id);
    store.setUserName(response.data.username);
    store.setType(newUser.type)
    router.go();
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div>
    <h1 v-if="form.user.type !== 'Admin' " class="offset-4">Register As a {{ form.user.type }}</h1>
    <h1 v-else   class="offset-4">Register As an {{ form.user.type }}</h1>
    <form @submit.prevent="handleAddUser" class="validated-form" novalidate>
      <div class="mb-3">
        <label class="form-label" for="userName">UserName</label>
        <input
          v-model="form.user.username"
          class="form-control"
          type="text"
          id="userName"
          name="userName"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">required!</div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input
          v-model="form.user.email"
          class="form-control"
          type="email"
          id="email"
          name="email"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">required!</div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="phoneNumber">PhoneNumber</label>
        <input
          v-model="form.user.phoneNumber"
          class="form-control"
          type="phoneNumber"
          id="phoneNumber"
          name="phoneNumber"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">required!</div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="password">Password</label>
        <input
          v-model="form.user.password"
          class="form-control"
          type="password"
          id="password"
          name="password"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">required!</div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="type">Register as:</label>
        <select v-model="form.user.type" class="form-select" aria-label="Default select example">
          <option selected value="Patient">Patient</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button class="btn btn-success col-3 offset-4 mt-3 text-center">
        Sign In
      </button>
    </form>
  </div>
</template>
