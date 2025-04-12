import AddDoctorView from '@/views/Doctors/AddDoctorView.vue'
import DoctorView from '@/views/Doctors/DoctorView.vue'
import EditDocotrView from '@/views/Doctors/EditDocotrView.vue'
import ManageAppointmentsView from '@/views/Doctors/ManageAppointmentsView.vue'
import Home from '@/views/Home.vue'
import CreateHospitalView from '@/views/Hospitals/AddHospitalView.vue'
import EditHospitalView from '@/views/Hospitals/EditHospitalView.vue'
import HospitalsView from '@/views/Hospitals/HospitalsView.vue'
import HospitalView from '@/views/Hospitals/HospitalView.vue'
import AppointmetsView from '@/views/Patients/AppointmetsView.vue'
import LogInView from '@/views/Users/LogInView.vue'
import RegisterView from '@/views/Users/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/hospitals',
      name: 'hospitals',
      component: HospitalsView,
    },
    {
      path: '/hospitals/new',
      name: 'hospital-new',
      component: CreateHospitalView,
    },
    {
      path: '/hospitals/:id/edit',
      name: 'hospital-edit',
      component: EditHospitalView,
    },
    {
      path: '/hospitals/:id',
      name: 'hospital',
      component: HospitalView,
    },
    {
      path: '/signIn',
      name: 'sigIn',
      component: RegisterView,
    },
    {
      path: '/logIn',
      name: 'logIn',
      component: LogInView,
    },
    {
      path: '/hospitals/:Hospital_id/doctors/add',
      name: 'doctor-add',
      component: AddDoctorView,
    },
    {
      path: '/hospitals/:Hospital_id/doctors/:id/edit',
      name: 'doctor-edit',
      component: EditDocotrView,
    },
    {
      path: '/hospitals/:Hospital_id/doctors/:id',
      name: 'doctor',
      component: DoctorView,
    },
    {
      path:'/patients/:Pattient_id/appointments',
      name: 'patient-appointments',
      component: AppointmetsView
    },
    {
      path:'/doctors/:Doctor_id/appointments',
      name: 'doctor-appointments',
      component: ManageAppointmentsView
    }
    
    
  ],
})

export default router
